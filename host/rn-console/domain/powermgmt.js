`use strict`

var {mock, AgentSample} = require("./sample");
var Response = require("./response");
var {GraphQLError} = require('graphql');
var {
  makeExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require ('graphql-tools');

const PowerMgmt = {
  schema: makeExecutableSchema({
    typeDefs: `
      enum OperationTypes {
        RESTART,
        SHUTDOWN,
        SUSPEND,
        WAKEONLAN
      }

      input PowerMgmtInput {
        "Tied Agent Id"
        agentIds: [Int]!
        "Initiate Operation to Machine"
        operation: OperationTypes!
      }

      type Query {
        "Retrieve Status Based on Agent Id"
        powerMgmtStatus(agentId: Int!): String
      }

      type Mutation {
        "Trigger A Restart/Shutdown/Suspend Or WakeOnLan"
        powerMgmtTrigger(input: PowerMgmtInput): String
      }
    `
  }),
  func: {
    powerMgmtStatus: (args) => {
      if(mock) {
        const {agentId} = args;
        const result = AgentSample.filter((agent) => agentId === agent.id);
        if(result.length === 0) {
          throw new GraphQLError(Response.NOT_FOUND(`[${agentId}]`));
        }
        else {
          return "Completed";
        }
      }
    },
    powerMgmtTrigger: (args) => {
      if(mock) {
        const {agentIds, operation} = args.input;
        const result = AgentSample.filter((agent) => agentIds.includes(agent.id));
        if(result.length === 0) {
          throw new GraphQLError(Response.NOT_FOUND(`[${agentIds}]`));
        }
        else {
          return Response.POWER_MGMT(`[${result.map((agent) => agent.id)}]`, operation);
        }
      }
    }
  }
}
module.exports = PowerMgmt
