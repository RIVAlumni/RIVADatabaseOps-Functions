import { firestore } from "firebase-admin"
import { Participation } from "../../models/collection"
import { Change, EventContext } from "firebase-functions"
import {
  ParticipationsList,
  ParticipationAggregation,
} from "../../models/aggregation"

/*
 * Listens for document updates in [participations]
 * collection.
 *
 * It will update the participations aggregation
 * document in [aggregations] collection with the
 * updated data.
 */

export function updateParticipationAggregation(
  change: Change<firestore.QueryDocumentSnapshot>,
  context: EventContext,
  db: FirebaseFirestore.Firestore
) {
  const batch = db.batch()
  const aggregationRef = db.doc("aggregations/participations")

  const oldData: Participation = <Participation>change.before.data()
  const newData: Participation = <Participation>change.after.data()

  const oldParticipationsList: ParticipationsList = {
    "Participation ID": context.params["docID"],
    "Membership ID": oldData["Membership ID"],
    "Event Code": oldData["Event Code"],
    "VIA Hours": oldData["VIA Hours"],
  }

  const oldParticipationData: ParticipationAggregation = {
    participations: firestore.FieldValue.arrayRemove(oldParticipationsList),
    participationsCount: firestore.FieldValue.increment(-1),
  }

  batch.set(aggregationRef, oldParticipationData, { merge: true })

  const newParticipationsList: ParticipationsList = {
    "Participation ID": context.params["docID"],
    "Membership ID": newData["Membership ID"],
    "Event Code": newData["Event Code"],
    "VIA Hours": newData["VIA Hours"],
  }

  const newAggregationData: ParticipationAggregation = {
    participations: firestore.FieldValue.arrayUnion(newParticipationsList),
    participationsCount: firestore.FieldValue.increment(1),
  }

  batch.set(aggregationRef, newAggregationData, { merge: true })

  return batch.commit().catch(console.error)
}
