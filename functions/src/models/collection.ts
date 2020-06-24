import { UserRoles, EventRoles } from "./roles"
import { firestore } from "firebase-admin"

// Found In: /users/
export interface User {
  "UID": string
  "Email": string | null
  "Photo URL": string | null
  "Display Name": string | null
  "Membership ID": string | null
  "Roles": UserRoles
  "updatedAt": firestore.FieldValue
  "createdAt": firestore.FieldValue
}

// Found In: /members/
export interface Member {
  "Membership ID": string
  "Full Name": string
  "Gender": string
  "Email": string
  "Current School": string
  "Contact Number": string
  "Home Number": number | null
  "Graduating Year": number | null
  "Graduating Class": string
  "Membership Status": string
  "Name Of Next-Of-Kin": string
  "Relationship With Next-Of-Kin": string
  "Contact Number Of Next-Of-Kin": number
  "updatedAt": firestore.FieldValue
  "createdAt": firestore.FieldValue
}

// Found In: /events/
export interface Event {
  "Event Year": number
  "Event Code": number
  "Event Name": string
  "Event Thumbnail": string
  "Event Overall In-Charge": string
  "Event Assistant In-Charge": string
  "Google Drive": string
  "Roles": Array<EventRoles>
  "updatedAt": firestore.FieldValue
  "createdAt": firestore.FieldValue
}

// Found In: /participations/
export interface Participation {
  "Event Code": number
  "Membership ID": string
  "Role": string
  "VIA Hours": number
  "updatedAt": firestore.FieldValue
  "createdAt": firestore.FieldValue
}
