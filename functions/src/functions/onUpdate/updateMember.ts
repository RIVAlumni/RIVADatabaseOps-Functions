import { Member } from "../../models/collection"
import { Change, EventContext, firestore } from "firebase-functions"

/*
 * Listens for document updates in [members]
 * collection.
 *
 * It will update the "updatedAt" field in
 * the member's document data.
 * 
 * TESTED SUCCESS ON 12/06/2020 AT 8:20 PM
 */

export function updateMember(
  change: Change<firestore.QueryDocumentSnapshot>,
  context: EventContext,
  db: FirebaseFirestore.Firestore
) {
  const oldData: Member = <Member>change.before.data()
  const newData: Member = <Member>change.after.data()

  if (!oldData["updatedAt"].isEqual(newData["updatedAt"])) {
    return Promise.resolve()
  }

  return change.after.ref
    .update({
      updatedAt: change.after.updateTime,
    })
    .catch(console.error)
}
