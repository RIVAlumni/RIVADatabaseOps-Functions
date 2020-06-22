import { auth } from "firebase-admin"

/*
 * Listens for users that have requested to
 * delete their account from the platform.
 *
 * It will find the corresponding user
 * UID and delete their user document from
 * [users] collection.
 *
 * TESTED SUCCESS ON 10/06/2020 AT 4:40 PM
 */

export function deleteUser(
  user: auth.UserRecord,
  db: FirebaseFirestore.Firestore
) {
  return db.doc(`users/${user.uid}`).delete().catch(console.error)
}
