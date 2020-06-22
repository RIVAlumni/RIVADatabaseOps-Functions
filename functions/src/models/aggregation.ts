import { firestore } from "firebase-admin"

/*
 * [UsersList], [MembersList], [EventsList],
 * [ParticipationsList] provide a structure
 * to how data should be presented and/or be
 * stored in Firestore.
 *
 * All 4 interfaces belong in their aggregation documents
 * with the key/value pair of [users], [members], [events],
 * [participations] respectively.
 */

export interface UsersList {
  "UID": string
  "Display Name": string | null
}

export interface MembersList {
  "Full Name": string
  "Membership ID": string
}

export interface EventsList {
  "Event Code": number
  "Event Name": string
}

export interface ParticipationsList {
  "Participation ID": string
  "Event Code": number
  "Membership ID": string
  "VIA Hours": number
}

/*
 * [UserAggregation], [MemberAggregation], [EventAggregation],
 * [ParticipationAggregation] provide a structure to how data
 * should be presented and/or stored in Firestore aggregation
 * collection.
 *
 * All 4 interfaces belong in their aggregation documents with
 * their identifier being, [users], [members], [events],
 * [participations] respectively.
 */

export interface UserAggregation {
  users: firestore.FieldValue
  usersCount: firestore.FieldValue
}

export interface MemberAggregation {
  members: firestore.FieldValue
  membersCount: firestore.FieldValue
}

export interface EventAggregation {
  events: firestore.FieldValue
  eventsCount: firestore.FieldValue
}

export interface ParticipationAggregation {
  participation: firestore.FieldValue
  participationsCount: firestore.FieldValue
}
