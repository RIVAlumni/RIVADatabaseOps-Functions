import { firestore } from "firebase-admin"
import { EventContext } from "firebase-functions"
import { MembersList, MemberAggregation } from "../../models/aggregation"
import { Member } from "../../models/collection"

/*
 * Listens for document creations in [members]
 * collection.
 *
 * It will automatically update the data
 * aggregation document in [aggregation]
 * collection.
 *
 * TESTED SUCCESS ON 10/06/2020 AT 1:40 PM
 */

export function createMemberAggregation(
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

  const aggregationRef = db.doc("aggregations/members")

  const membersList: MembersList = {
    "Membership ID": context.params["docID"],
    "Full Name": (snapshot.data() as Member)["Full Name"],
  }

  const aggregationData: MemberAggregation = {
    members: firestore.FieldValue.arrayUnion(membersList),
    membersCount: firestore.FieldValue.increment(1),
  }

  return aggregationRef
    .set(aggregationData, { merge: true })
    .catch(console.error)
}
