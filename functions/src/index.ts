import * as admin from "firebase-admin"
import * as functions from "firebase-functions"

import {
  _createUser,
  _createEvent,
  _createMember,
  _createUserAggregation,
  _createEventAggregation,
  _createMemberAggregation,
  _createParticipationAggregation,
} from "./functions/onCreate"

import {
  _updateUser,
  _updateEvent,
  _updateMember,
  _updateParticipation,
  _updateUserAggregation,
  _updateEventAggregation,
  _updateMemberAggregation,
  _updateParticipationAggregation,
} from "./functions/onUpdate"

import {
  _deleteUser,
  _deleteEvent,
  _deleteMember,
  _deleteUserAggregation,
  _deleteEventAggregation,
  _deleteMemberAggregation,
  _deleteParticipationAggregation,
} from "./functions/onDelete"

/*
 * Initialize server-side Firebase Admin SDK.
 * Credentials are automatically handled by
 * Google's Servers as they are already
 * authenticated as "sudo-user".
 */
admin.initializeApp()

/*
 * Attach Firestore Admin SDK to a variable
 * for easier referencing.
 */
const db = admin.firestore()

/*
 * Indicate where the Cloud Functions are
 * supposed to be deployed for better
 * latency and throughput.
 */
const DEPLOYMENT_REGION = "asia-east2"

/*
 * ********************************
 * * New User / Documents Section *
 * ********************************
 */

export const createUser = functions
  .region(DEPLOYMENT_REGION)
  .auth.user()
  .onCreate(user => _createUser(user, db))

export const updateUser = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("users/{docID}")
  .onUpdate((chg, ctx) => _updateUser(chg, ctx, db))

export const deleteUser = functions
  .region(DEPLOYMENT_REGION)
  .auth.user()
  .onDelete(user => _deleteUser(user, db))

export const createMember = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("members/{docID}")
  .onCreate((snap, ctx) => _createMember(snap, ctx, db))

export const updateMember = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("members/{docID}")
  .onUpdate((chg, ctx) => _updateMember(chg, ctx, db))

export const deleteMember = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("members/{docID}")
  .onDelete((snap, ctx) => _deleteMember(snap, ctx, db))

export const createEvent = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("events/{docID}")
  .onCreate((snap, ctx) => _createEvent(snap, ctx, db))

export const updateEvent = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("events/{docID}")
  .onUpdate((chg, ctx) => _updateEvent(chg, ctx, db))

export const deleteEvent = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("events/{docID}")
  .onDelete((snap, ctx) => _deleteEvent(snap, ctx, db))

export const updateParticipation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("participations/{docID}")
  .onUpdate((chg, ctx) => _updateParticipation(chg, ctx, db))

/*
 * ****************************
 * * Data Aggregation Section *
 * ****************************
 */

export const createUserAggregation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("users/{docID}")
  .onCreate((snap, ctx) => _createUserAggregation(snap, ctx, db))

export const updateUserAggregation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("users/{docID}")
  .onUpdate((chg, ctx) => _updateUserAggregation(chg, ctx, db))

export const deleteUserAggregation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("users/{docID}")
  .onDelete((snap, ctx) => _deleteUserAggregation(snap, ctx, db))

export const createMemberAggregation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("members/{docID}")
  .onCreate((snap, ctx) => _createMemberAggregation(snap, ctx, db))

export const updateMemberAggregation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("members/{docID}")
  .onUpdate((chg, ctx) => _updateMemberAggregation(chg, ctx, db))

export const deleteMemberAggregation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("members/{docID}")
  .onDelete((snap, ctx) => _deleteMemberAggregation(snap, ctx, db))

export const createEventAggregation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("events/{docID}")
  .onCreate((snap, ctx) => _createEventAggregation(snap, ctx, db))

export const updateEventAggregation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("events/{docID}")
  .onUpdate((chg, ctx) => _updateEventAggregation(chg, ctx, db))

export const deleteEventAggregation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("events/{docID}")
  .onDelete((snap, ctx) => _deleteEventAggregation(snap, ctx, db))

export const createParticipationAggregation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("participations/{docID}")
  .onCreate((snap, ctx) => _createParticipationAggregation(snap, ctx, db))

export const updateParticipationAggregation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("participations/{docID}")
  .onUpdate((chg, ctx) => _updateParticipationAggregation(chg, ctx, db))

export const deleteParticipationAggregation = functions
  .region(DEPLOYMENT_REGION)
  .firestore.document("participations/{docID}")
  .onDelete((snap, ctx) => _deleteParticipationAggregation(snap, ctx, db))
