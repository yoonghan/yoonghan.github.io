`use strict`

module.exports = {
  DELETED: (id) => `Record ${id} deleted.`,
  UPDATED: (id) => `Record ${id} updated.`,
  CONNECTED: (id) => `Record ${id} connected.`,
  COLLECT: (ids) => `Record ${ids} initiate for collection.`,
  POWER_MGMT: (id, status) => `Record ${id} initiate for ${status}`,
  EMPTY_INVENTORY: (id) => `Inventory for agentId ${id} has not been collected`,
  FAIL_DELETE: (id, msg) => `Record ${id} fail to delete due to ${msg}`,
  NOT_FOUND_CONNECT: (id) => `Record ${id} not found for connect.`,
  NOT_FOUND_DELETE: (id) => `Record ${id} not found for delete.`,
  NOT_FOUND_UPDATE: (id) => `Record ${id} not found for update.`,
  NOT_FOUND: (id) => `Record ${id} not found`,
}
