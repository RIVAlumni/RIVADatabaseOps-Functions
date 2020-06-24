import { User } from "../../models/collection"
import { Change, EventContext, firestore } from "firebase-functions"

/*
 * Listens for document updates in [users]
 * collection.
 *
 * It will update the "updatedAt" field in
 * the user's document data.
 *
 * TESTED SUCCESS ON 12/06/2020 AT 4:00 PM
 */

export function updateUser(
  change: Change<firestore.QueryDocumentSnapshot>,
  context: EventContext,
  db: FirebaseFirestore.Firestore
) {
  const oldData: User = <User>change.before.data()
  const newData: User = <User>change.after.data()

  if (!oldData["updatedAt"].isEqual(newData["updatedAt"])) {
    return Promise.resolve()
  }

  return change.after.ref
    .update({
      updatedAt: change.after.updateTime,
    })
    .catch(console.error)
}
