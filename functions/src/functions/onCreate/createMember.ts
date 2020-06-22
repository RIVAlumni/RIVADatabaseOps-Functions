import { firestore } from "firebase-admin"
import { Member } from "../../models/collection"
import { EventContext } from "firebase-functions"

/*
 * Listens for document creations in [members]
 * collection.
 *
 * It will only update the "Membership ID" field
 * in the document.
 *
 * TESTED SUCCESS ON 10/06/2020 AT 1:40 PM
 */

export function createMember(
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

  const data: Member = snapshot.data() as Member

  const memberData: Member = {
    "Membership ID": context.params["docID"],
    "Full Name": data["Full Name"],
    "Gender": data["Gender"],
    "Email": data["Email"],
    "Current School": data["Current School"],
    "Contact Number": data["Contact Number"],
    "Home Number": data["Home Number"],
    "Graduating Year": data["Graduating Year"],
    "Graduating Class": data["Graduating Class"],
    "Membership Status": data["Membership Status"],
    "Name Of Next-Of-Kin": data["Name Of Next-Of-Kin"],
    "Relationship With Next-Of-Kin": data["Relationship With Next-Of-Kin"],
    "Contact Number Of Next-Of-Kin": data["Contact Number Of Next-Of-Kin"],
    "updatedAt": firestore.FieldValue.serverTimestamp(),
    "createdAt": firestore.FieldValue.serverTimestamp(),
  }

  return snapshot.ref.set(memberData, { merge: true }).catch(console.error)
}
