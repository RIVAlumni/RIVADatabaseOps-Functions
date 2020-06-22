import { firestore } from "firebase-admin"
import { EventContext } from "firebase-functions"

/*
 * Listens for document deletions in [events]
 * collection.
 *
 * It will automatically delete all participation
 * documents that belong to the deleted event.
 * 
 * TESTED SUCCESS ON 13/06/2020 AT 4:20 PM
 */

export async function deleteEvent(
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

  const participationData = await db
    .collection("participations")
    .where("Event Code", "==", Number(context.params["docID"]))
    .get()

  return participationData.forEach(doc => doc.ref.delete())
}
