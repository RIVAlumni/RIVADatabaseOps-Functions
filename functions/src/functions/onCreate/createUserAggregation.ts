import { firestore } from "firebase-admin"
import { User } from "../../models/collection"
import { EventContext } from "firebase-functions"
import { UsersList, UserAggregation } from "../../models/aggregation"

/*
 * Listens for document creations in [users]
 * collection.
 *
 * It will automatically update the data
 * aggregation document in [aggregation]
 * collection.
 *
 * TESTED SUCCESS ON 10/06/2020 AT 1:30 PM
 */

export function createUserAggregation(
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: EventContext,
  db: FirebaseFirestore.Firestore
) {
  /*
   * @deprecated
   *
   * Should be removed by the next release.
   * Aggregation documents would be moved into
   * their own collections and documents
   */
  if (context.params["docID"] === "dataAggregation") return Promise.resolve()

  const aggregationRef = db.doc("aggregations/users")

  const usersList: UsersList = {
    "UID": context.params["docID"],
    "Display Name": (snapshot.data() as User)["Display Name"],
  }

  const aggregationData: UserAggregation = {
    users: firestore.FieldValue.arrayUnion(usersList),
    usersCount: firestore.FieldValue.increment(1),
  }

  return aggregationRef
    .set(aggregationData, { merge: true })
    .catch(console.error)
}
