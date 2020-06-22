import { firestore } from "firebase-admin"
import { Event } from "../../models/collection"
import { EventContext } from "firebase-functions"
import { EventsList, EventAggregation } from "../../models/aggregation"

/*
 * Listens for document creations in [events]
 * collection.
 *
 * It will automatically update the data
 * aggregation document in [aggregation]
 * collection.
 *
 * TESTED SUCCESS ON 10/06/2020 AT 1:50 PM
 */

export function createEventAggregation(
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

  const aggregationRef = db.doc("aggregations/events")

  const eventsList: EventsList = {
    "Event Code": Number(context.params["docID"]),
    "Event Name": (snapshot.data() as Event)["Event Name"],
  }

  const aggregationData: EventAggregation = {
    events: firestore.FieldValue.arrayUnion(eventsList),
    eventsCount: firestore.FieldValue.increment(1),
  }

  return aggregationRef
    .set(aggregationData, { merge: true })
    .catch(console.error)
}
