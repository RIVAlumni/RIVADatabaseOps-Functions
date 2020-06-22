import { firestore } from "firebase-admin"
import { EventContext } from "firebase-functions"
import { Event, Participation } from "../../models/collection"

/*
 * Listens for document creations in [events]
 * collection.
 *
 * It will automatically create participation
 * records for both the event overall in-charge
 * and the event assistant in-charge.
 *
 * TESTED SUCCESS ON 10/06/2020 AT 1:50 PM
 */

export async function createEvent(
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

  const batch = db.batch()
  const data: Event = (await snapshot.data()) as Event
  const participationRef = db.collection("participations")

  const eventData: Event = {
    "Event Year": data["Event Year"],
    "Event Code": Number(context.params["docID"]),
    "Event Name": data["Event Name"],
    "Event Thumbnail": data["Event Thumbnail"],
    "Event Overall In-Charge": data["Event Overall In-Charge"],
    "Event Assistant In-Charge": data["Event Assistant In-Charge"],
    "Google Drive": data["Google Drive"],
    "Roles": data["Roles"],
    "updatedAt": firestore.FieldValue.serverTimestamp(),
    "createdAt": firestore.FieldValue.serverTimestamp(),
  }

  batch.set(snapshot.ref, eventData, { merge: true })

  const oicParticipation: Participation = {
    "Event Code": Number(context.params["docID"]),
    "Membership ID": data["Event Overall In-Charge"],
    "Role": "OIC",
    "VIA Hours": 0,
    "updatedAt": firestore.FieldValue.serverTimestamp(),
    "createdAt": firestore.FieldValue.serverTimestamp(),
  }

  batch.set(participationRef.doc(), oicParticipation, { merge: true })

  const aicParticipation: Participation = {
    "Event Code": Number(context.params["docID"]),
    "Membership ID": data["Event Assistant In-Charge"],
    "Role": "AIC",
    "VIA Hours": 0,
    "updatedAt": firestore.FieldValue.serverTimestamp(),
    "createdAt": firestore.FieldValue.serverTimestamp(),
  }

  batch.set(participationRef.doc(), aicParticipation, { merge: true })

  return batch.commit().catch(console.error)
}
