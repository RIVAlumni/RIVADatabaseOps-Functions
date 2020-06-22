import { deleteUser } from "./onDelete/deleteUser"
import { deleteEvent } from "./onDelete/deleteEvent"
import { deleteMember } from "./onDelete/deleteMember"

import { deleteUserAggregation } from "./onDelete/deleteUserAggregation"
import { deleteEventAggregation } from "./onDelete/deleteEventAggregation"
import { deleteMemberAggregation } from "./onDelete/deleteMemberAggregation"
import { deleteParticipationAggregation } from "./onDelete/deleteParticipationAggregation"

export {
  deleteUser as _deleteUser,
  deleteEvent as _deleteEvent,
  deleteMember as _deleteMember,
  deleteUserAggregation as _deleteUserAggregation,
  deleteEventAggregation as _deleteEventAggregation,
  deleteMemberAggregation as _deleteMemberAggregation,
  deleteParticipationAggregation as _deleteParticipationAggregation,
}
