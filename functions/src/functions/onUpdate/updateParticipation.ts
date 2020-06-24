import { Change, EventContext, firestore } from "firebase-functions"
import { Participation } from "../../models/collection"

/*
 * Listens for document updates in [participations]
 * collection.
 *
 * It will update the "updatedAt" field in the
 * user's document data.
 * 
 * TESTED SUCCESS ON 13/06/2020 AT 12:30 PM
 */

export function updateParticipation(
  change: Change<firestore.QueryDocumentSnapshot>,
  context: EventContext,
  db: FirebaseFirestore.Firestore
) {
  const oldData: Participation = <Participation>change.before.data()
  const newData: Participation = <Participation>change.after.data()

  if (!oldData["updatedAt"].isEqual(newData["updatedAt"]))
    return Promise.resolve()

  return change.after.ref
    .update({
      updatedAt: change.after.updateTime,
    })
    .catch(console.error)
}
