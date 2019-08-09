const {GraphQLError} = require('graphql');
const Response = require("./response");
const Agent = require('./agent');


test('Test agent', () => {
  const {agent} = Agent.func;
  expect(agent({id: 12}))
    .toEqual(
      {
        id: 12,
        agentMOId: "WinStore-Sys25Win10IoT16",
        agentVersion: "V3R2.1",
        agentType: "Master Agent",
        deviceId: "Sys25Win10IoT16",
        systemId: "ma-Sys25Win10IoT16.10150",
        ipAddress: "1x.xx4.xxx.xx",
        is64bitOS: true,
        mgmtPort: "10150",
        connectionStatus: "connected",
        storeId: 12,
        maMOId: "WinStore-Sys25Win10IoT16",
        agentAuthState: "authenticated",
        deviceType: 17,
        modelType: 6140,
        modelNumber: 145,
        MACAddress: "JC",
        networkMask: "255.255.255.0",
        isMasked: false,
        isMCF: false,
        osValue: 86
      }
    );
    expect(() => agent({id: 99})).toThrow(GraphQLError);
});

test('Test agentsByStoreId', () => {
  const {agentsByStoreId} = Agent.func;
  expect(agentsByStoreId({storeId: 12}))
    .toContainEqual(
        {
          id: 12,
          agentMOId: "WinStore-Sys25Win10IoT16",
          agentVersion: "V3R2.1",
          agentType: "Master Agent",
          deviceId: "Sys25Win10IoT16",
          systemId: "ma-Sys25Win10IoT16.10150",
          ipAddress: "1x.xx4.xxx.xx",
          is64bitOS: true,
          mgmtPort: "10150",
          connectionStatus: "connected",
          storeId: 12,
          maMOId: "WinStore-Sys25Win10IoT16",
          agentAuthState: "authenticated",
          deviceType: 17,
          modelType: 6140,
          modelNumber: 145,
          MACAddress: "JC",
          networkMask: "255.255.255.0",
          isMasked: false,
          isMCF: false,
          osValue: 86
        }
    );
  expect(agentsByStoreId({storeId: 99}).length).toBe(0);
});


test('Test agents', () => {
  const {agents} = Agent.func;
  expect(agents())
    .toContainEqual(
        {
          id: 12,
          agentMOId: "WinStore-Sys25Win10IoT16",
          agentVersion: "V3R2.1",
          agentType: "Master Agent",
          deviceId: "Sys25Win10IoT16",
          systemId: "ma-Sys25Win10IoT16.10150",
          ipAddress: "1x.xx4.xxx.xx",
          is64bitOS: true,
          mgmtPort: "10150",
          connectionStatus: "connected",
          storeId: 12,
          maMOId: "WinStore-Sys25Win10IoT16",
          agentAuthState: "authenticated",
          deviceType: 17,
          modelType: 6140,
          modelNumber: 145,
          MACAddress: "JC",
          networkMask: "255.255.255.0",
          isMasked: false,
          isMCF: false,
          osValue: 86
        }
    );
});

test('Test agentDelete', () => {
  const {agentDelete} = Agent.func;
  expect(()=>agentDelete({id:99})).toThrow(GraphQLError);
  expect(()=>agentDelete({id:12})).toThrow(new GraphQLError(Response.FAIL_DELETE(12, "agent is a Master agent or not disconnected")));
  expect(agentDelete({id:17})).toBe(Response.DELETED(17));
});
