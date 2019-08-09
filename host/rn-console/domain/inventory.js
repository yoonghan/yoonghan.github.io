`use strict`

var {mock, InventorySample, AgentSample} = require("./sample");
var Response = require("./response");
var {GraphQLError} = require('graphql');
var {
  makeExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require ('graphql-tools');

var inventory = [
];

const Inventory = {
  schema: makeExecutableSchema({
    typeDefs: `
      type Inventory {
        id: Int!
        storeId: String!
        agentId: String!
        data: String!
        registrationId: String
        percentage: Int
        status: String
      }

      type Query {
        inventoryByAgentId(agentId: Int!): Inventory
        inventoryStatus(registrationId: String!): Int
      }

      type Mutation {
        inventoryCollect(agentIds: [Int]!): String
      }
    `
  }),
  func: {
    inventoryByAgentId: (args) => {
      if(mock) {
        const {agentId} = args;
        const result = InventorySample.filter((inventory) => agentId===inventory.agentId);
        if(result.length === 0) {
          throw new GraphQLError(Response.EMPTY_INVENTORY(agentId));
        }
        return result[0];
      }
    },
    inventoryStatus: (args) => {
      if(mock) {
        const {registrationId} = args;
        const result = InventorySample.filter((inventory) => registrationId===inventory.registrationId);
        if(result.length === 0 || result[0].status !== "Initiated") {
          throw new GraphQLError(Response.NOT_FOUND(registrationId));
        }
        else {
          return result[0].percentage;
        }
      }
    },
    inventoryCollect: (args) => {
      if(mock) {
        const {agentIds} = args;
        const result = AgentSample.filter((agent) => agentIds.includes(agent.id));
        if(result.length === 0) {
          throw new GraphQLError(Response.NOT_FOUND(agentIds));
        }
        return Response.COLLECT(result.map(agent => agent.id));
      }
    }
  }
}
module.exports = Inventory
