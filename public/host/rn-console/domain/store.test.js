const {GraphQLError} = require('graphql');
const Response = require("./response");
const Store = require('./store');

test('Test Store Query', () => {
  const {storesBy, store, storesByIds, stores, storeLogs} = Store.func;

  expect(storesBy({hostName:"Bryce01"}))
  .toContainEqual({
    id: 12,
    ipAddress: "19.122.111.111",
    hostName: "Bryce01",
    portNumber: "10149",
    eventFilterFlags: "FATAL_CRITICAL_MINOR",
    connectionStatus: "undiscovered"
  });

  expect(storesBy({ipAddress:"19.122.111.112"}))
  .toContainEqual({
    id: 13,
    ipAddress: "19.122.111.112",
    hostName: "Bryce02",
    portNumber: "10149",
    eventFilterFlags: "FATAL_CRITICAL_MINOR_WARNING",
    connectionStatus: "connected"
  });

  expect(storesBy({hostName:"Bryce03"}))
  .toContainEqual({
    id: 14,
    ipAddress: "19.122.111.113",
    hostName: "Bryce03",
    portNumber: "10149",
    eventFilterFlags: "FATAL",
    connectionStatus: "connected"
  });

  expect(storesBy({portNumber:"10149"}).length).toBe(3);

  expect(storesBy({portNumber:"999"}).length).toBe(0);

});

test('Test Store Connection Log', () => {
  const {storeLogs} = Store.func;
  expect(storeLogs({id:1}))
  .toBe("02-27-2018 14:13:00:194 - Attempting for connection to Master Agent with IpAddress: 1x.xx4.xxx.xx:Connection IpAddress: 1x.xx4.xxx.xx | 02-27-2018 14:13:00:194 - Using hostname/IP: null/ 10.113.129.50:10149 to connect | 02-27-2018 14:13:00:194 - Attempting connection with agent version: 22(V3R2.2) | 02-27-2018 14:13:00:197 - Attempting to obtain Master Agent information from address: 10.113.129.50 | 02-27-2018 14:13:00:511 - Master Agent uses Standard Security for Store : 207 | 02-27-2018 14:13:00:868 - Connection established with Master Agent |");
});

test('Test Store storeAuthorize', () => {
  const {storeAuthorize} = Store.func;
  expect(storeAuthorize({input: {id:12, name:"test", password:"password"}}))
  .toEqual({
    id: 12,
    ipAddress: "19.122.111.111",
    hostName: "Bryce01",
    portNumber: "10149",
    eventFilterFlags: "FATAL_CRITICAL_MINOR",
    connectionStatus: "undiscovered"
  });

  expect(() => storeAuthorize({input: {id:19, name:"test", password:"password"}}))
  .toThrow(GraphQLError);
});

test('Test Store storeRegister and storeUpdate and storeUnregister', () => {
  const {storeRegister, storeUpdate, storeUnregister} = Store.func;
  expect(
    storeRegister({input: {
      ipAddress: "1.1.1.1",
      hostName: "hostname",
      portNumber: "10249",
      eventFilterFlags: "FATAL_CRITICAL"
    }}
    )
  )
  .toEqual({
    id: 15,
    ipAddress: "1.1.1.1",
    hostName: "hostname",
    portNumber: "10249",
    eventFilterFlags: "FATAL_CRITICAL",
    connectionStatus: "unauthenticated"
  });

  expect(
    storeUpdate({id: 15, input: {
      ipAddress: "2.2.2.2",
      hostName: "hostname2",
      portNumber: "102492",
      eventFilterFlags: "FATAL"
    }}
    )
  )
  .toEqual({
    id: 15,
    ipAddress: "2.2.2.2",
    hostName: "hostname2",
    portNumber: "102492",
    eventFilterFlags: "FATAL",
    connectionStatus: "unauthenticated"
  });

  expect(() => storeUpdate({id: 17, input: {
    ipAddress: "2.2.2.2",
    hostName: "hostname2",
    portNumber: "102492",
    eventFilterFlags: "FATAL"
  }})).toThrow(GraphQLError);

  expect(storeUnregister({ids:[15]})).toBe(Response.DELETED(`[15]`));
  expect(() => storeUnregister({ids:[15]})).toThrow(GraphQLError);
});

test('Test Store ReConnect', () => {
  const {storeReconnect, storesReconnect} = Store.func;

  expect(storeReconnect({id: 12})).toEqual({
    id: 12,
    ipAddress: "19.122.111.111",
    hostName: "Bryce01",
    portNumber: "10149",
    eventFilterFlags: "FATAL_CRITICAL_MINOR",
    connectionStatus: "undiscovered"
  });

  expect(() => storeReconnect({id: 99})).toThrow(GraphQLError);

  expect(storesReconnect({ids: [12,99]})).toBe(Response.CONNECTED(`[12]`));
});
