import { firestore } from "firebase-admin"
import { Member } from "../../models/collection"
import { MembersList, MemberAggregation } from "../../models/aggregation"
import {
  Change,
  EventContext,
} from "firebase-functions"

/*
 * Listens for document updates in [members]
 * collection.
 *
 * It will update the members aggregation
 * document in [aggregations] collection
 * with the updated data.
 * 
 * TESTED SUCCESS ON 16/06/2020 AT 9:20 PM
 */

export function updateMemberAggregation(
  change: Change<firestore.QueryDocumentSnapshot>,
  context: EventContext,
  db: FirebaseFirestore.Firestore
) {
  const batch = db.batch()
  const aggregationRef = db.doc("aggregations/members")

  const oldData: Member = <Member>change.before.data()
  const newData: Member = <Member>change.after.data()

  const oldMembersList: MembersList = {
    "Full Name": oldData["Full Name"],
    "Membership ID": oldData["Membership ID"],
  }

  const oldAggregationData: MemberAggregation = {
    members: firestore.FieldValue.arrayRemove(oldMembersList),
    membersCount: firestore.FieldValue.increment(-1),
  }

  batch.set(aggregationRef, oldAggregationData, { merge: true })

  const newMembersList: MembersList = {
    "Full Name": newData["Full Name"],
    "Membership ID": newData["Membership ID"],
  }

  const newAggregationData: MemberAggregation = {
    members: firestore.FieldValue.arrayUnion(newMembersList),
    membersCount: firestore.FieldValue.increment(1),
  }

  batch.set(aggregationRef, newAggregationData, { merge: true })

  return batch.commit().catch(console.error)
}
