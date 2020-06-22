import { auth, firestore } from "firebase-admin"
import { Member, User } from "../../models/collection"

/*
 * Listens for users that are logging into the
 * platform for the first time.
 *
 * It will create a new user document and set
 * their account details in the document.
 *
 * It will also verify if the user is an alumni
 * member by checking if the account's email
 * address matches any of the alumni profiles
 * created beforehand, and updating the user
 * document accordingly.
 *
 * TESTED SUCCESS ON 10/06/2020 AT 1:30 PM
 */

export function createUser(
  user: auth.UserRecord,
  db: FirebaseFirestore.Firestore
) {
  const userRef = db.doc(`users/${user.uid}`)
  const membersRef = db
    .collection("members")
    .where("Email", "==", user.email)
    .limit(1)

  return db
    .runTransaction(t => {
      return t
        .get(membersRef)
        .then(col => {
          let isAlumni = false
          let isMember = null

          col.forEach(doc => {
            if (user.email === (doc.data() as Member)["Email"]) {
              isAlumni = true
              isMember = doc.id
            }
          })

          const userData: User = {
            "UID": user.uid,
            "Email": !user.email ? null : user.email,
            "Photo URL": !user.photoURL ? null : user.photoURL,
            "Display Name": !user.displayName ? null : user.displayName,
            "Membership ID": isMember,
            "Roles": {
              Administrator: false,
              Editor: false,
              Alumni: isAlumni,
            },
            "updatedAt": firestore.FieldValue.serverTimestamp(),
            "createdAt": firestore.FieldValue.serverTimestamp(),
          }

          return t.set(userRef, userData, { merge: true })
        })
        .catch(console.error)
    })
    .catch(console.error)
}
