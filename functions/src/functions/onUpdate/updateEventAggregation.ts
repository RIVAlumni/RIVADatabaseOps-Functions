import { firestore } from "firebase-admin"
import { Event } from "../../models/collection"
import { Change, EventContext } from "firebase-functions"
import { EventsList, EventAggregation } from "../../models/aggregation"

/*
 * Listens for document updates in [events]
 * collection.
 *
 * It will update the events aggregation
 * document in [aggregations] collection
 * with the updated data.
 * 
 * TESTED SUCCESS ON 16/06/2020 AT 9:40 PM
 */

export function updateEventAggregation(
  change: Change<firestore.QueryDocumentSnapshot>,
  context: EventContext,
  db: FirebaseFirestore.Firestore
) {
  const batch = db.batch()
  const aggregationRef = db.doc("aggregations/events")

  const oldData: Event = <Event>change.before.data()
  const newData: Event = <Event>change.after.data()

  const oldEventsList: EventsList = {
    "Event Code": oldData["Event Code"],
    "Event Name": oldData["Event Name"],
  }

  const oldAggregationData: EventAggregation = {
    events: firestore.FieldValue.arrayRemove(oldEventsList),
    eventsCount: firestore.FieldValue.increment(-1),
  }

  batch.set(aggregationRef, oldAggregationData, { merge: true })

  const newEventsList: EventsList = {
    "Event Code": newData["Event Code"],
    "Event Name": newData["Event Name"],
  }

  const newAggregationData: EventAggregation = {
    events: firestore.FieldValue.arrayUnion(newEventsList),
    eventsCount: firestore.FieldValue.increment(1),
  }

  batch.set(aggregationRef, newAggregationData, { merge: true })

  return batch.commit().catch(console.error)
}
