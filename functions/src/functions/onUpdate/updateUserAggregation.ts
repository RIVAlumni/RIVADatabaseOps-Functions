import { firestore } from "firebase-admin"
import { User } from "../../models/collection"
import {
  Change,
  EventContext,
  firestore as _firestore,
} from "firebase-functions"
import { UsersList, UserAggregation } from "../../models/aggregation"

/*
 * Listens for document updates in [users]
 * collection.
 *
 * It will update the users aggregation
 * document in [aggregations] collection
 * with the updated data.
 * 
 * TESTED SUCCESS ON 16/06/2020 AT 7:30 PM
 */

export function updateUserAggregation(
  change: Change<_firestore.QueryDocumentSnapshot>,
  context: EventContext,
  db: FirebaseFirestore.Firestore
) {
  const batch = db.batch()
  const aggregationRef = db.doc("aggregations/users")

  const oldData: User = <User>change.before.data()
  const newData: User = <User>change.after.data()

  const oldUsersList: UsersList = {
    "UID": context.params["docID"],
    "Display Name": oldData["Display Name"],
  }

  const oldAggregationData: UserAggregation = {
    users: firestore.FieldValue.arrayRemove(oldUsersList),
    usersCount: firestore.FieldValue.increment(-1),
  }

  batch.set(aggregationRef, oldAggregationData, { merge: true })

  const newUsersList: UsersList = {
    "UID": context.params["docID"],
    "Display Name": newData["Display Name"],
  }

  const newAggregationData: UserAggregation = {
    users: firestore.FieldValue.arrayUnion(newUsersList),
    usersCount: firestore.FieldValue.increment(1)
  }

  batch.set(aggregationRef, newAggregationData, { merge: true })

  return batch.commit().catch(console.error)
}
