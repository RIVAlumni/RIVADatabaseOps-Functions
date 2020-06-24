import { firestore } from "firebase-admin"
import { EventContext } from "firebase-functions"

/*
 * Listens for document deletions in [members]
 * collection.
 *
 * It will automatically delete all participation
 * documents that belong to the deleted member.
 *
 * TESTED SUCCESS ON 10/06/2020 AT 12:50 PM
 */

export async function deleteMember(
  snapshot: firestore.QueryDocumentSnapshot,
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

  const participationsData = await db
    .collection("participations")
    .where("Membership ID", "==", context.params["docID"])
    .get()

  participationsData.forEach(doc => doc.ref.delete())

  return
}
