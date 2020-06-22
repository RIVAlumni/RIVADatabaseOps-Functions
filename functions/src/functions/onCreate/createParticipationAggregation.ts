import { firestore } from "firebase-admin"
import { EventContext } from "firebase-functions"
import { Participation } from "../../models/collection"
import {
  ParticipationsList,
  ParticipationAggregation,
} from "../../models/aggregation"

/*
 * Listens for document creations in [participations]
 * collection.
 *
 * It will automatically update the data aggregation
 * document in [aggregation] collection.
 *
 * TESTED SUCCESS ON 10/06/2020 AT 2:40 PM
 */

export function createParticipationAggregation(
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

  const data = snapshot.data() as Participation
  const eventRef = db.doc(`events/${data["Event Code"]}`)
  const aggregationRef = db.doc("aggregations/participations")

  return db.runTransaction(t => {
    return t.get(eventRef).then(doc => {
      const participationsList: ParticipationsList = {
        "Participation ID": context.params["docID"],
        "Event Code": Number(data["Event Code"]),
        "Membership ID": data["Membership ID"],
        "VIA Hours": Number(data["VIA Hours"]),
      }

      const aggregationData: ParticipationAggregation = {
        participation: firestore.FieldValue.arrayUnion(participationsList),
        participationsCount: firestore.FieldValue.increment(1),
      }

      return t.set(aggregationRef, aggregationData, { merge: true })
    })
  })
}
