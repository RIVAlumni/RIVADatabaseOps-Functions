import { firestore } from "firebase-admin"
import { EventContext } from "firebase-functions"
import {
  ParticipationsList,
  ParticipationAggregation,
} from "../../models/aggregation"
import { Participation } from "../../models/collection"

/*
 * Listens for document deletions in [participations]
 * collection.
 *
 * It will automatically update the data aggregation
 * document in [aggregation] collection.
 *
 * TESTED SUCCESS ON 10/06/2020 AT 7:20 PM
 */

export function deleteParticipationAggregation(
  snapshot: firestore.QueryDocumentSnapshot,
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
  const aggregationRef = db.doc("aggregations/participations")

  /*
   * Creating the map data to remove from the aggregation
   * document.
   */
  const participationsList: ParticipationsList = {
    "Participation ID": context.params["docID"],
    "Event Code": Number(data["Event Code"]),
    "Membership ID": data["Membership ID"],
    "VIA Hours": Number(data["VIA Hours"]),
  }

  /*
   * Updating the aggregation document to remove the deleted
   * participation data out of the array and decrease the total
   * count by 1.
   */
  const aggregationData: ParticipationAggregation = {
    participations: firestore.FieldValue.arrayRemove(participationsList),
    participationsCount: firestore.FieldValue.increment(-1),
  }

  /*
   * Set the new data into the aggregation document for updating.
   */
  return aggregationRef
    .set(aggregationData, { merge: true })
    .catch(console.error)
}
