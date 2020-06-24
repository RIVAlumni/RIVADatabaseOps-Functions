import { Event } from "../../models/collection"
import { Change, EventContext, firestore } from "firebase-functions"

/*
 * Listens for document updates in [events]
 * collection.
 *
 * It will update the "updatedAt" field in
 * the event's document data.
 *
 * TESTED SUCCESS ON 12/06/2020 AT 9:20 PM
 */

export function updateEvent(
  change: Change<firestore.QueryDocumentSnapshot>,
  context: EventContext,
  db: FirebaseFirestore.Firestore
) {
  const oldData: Event = <Event>change.before.data()
  const newData: Event = <Event>change.after.data()

  if (!oldData["updatedAt"].isEqual(newData["updatedAt"]))
    return Promise.resolve()

  return change.after.ref
    .update({
      updatedAt: change.after.updateTime,
    })
    .catch(console.error)
}
