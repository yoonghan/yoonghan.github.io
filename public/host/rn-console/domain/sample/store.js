module.exports = [
  {
    id: 12,
    ipAddress: "19.122.111.111",
    hostName: "Bryce01",
    portNumber: "10149",
    eventFilterFlags: 31,
    connectionStatus: "undiscovered"
  },
  {
    id: 13,
    ipAddress: "19.122.111.112",
    hostName: "Bryce02",
    portNumber: "10149",
    eventFilterFlags: 127,
    connectionStatus: "connected"
  },
  {
    id: 14,
    ipAddress: "19.122.111.113",
    hostName: "Bryce03",
    portNumber: "10149",
    eventFilterFlags: 3,
    connectionStatus: "connected"
  }
];

module.exports.ConnectionLog = "02-27-2018 14:13:00:194 - Attempting for connection to Master Agent with IpAddress: 1x.xx4.xxx.xx:Connection IpAddress: 1x.xx4.xxx.xx | 02-27-2018 14:13:00:194 - Using hostname/IP: null/ 10.113.129.50:10149 to connect | 02-27-2018 14:13:00:194 - Attempting connection with agent version: 22(V3R2.2) | 02-27-2018 14:13:00:197 - Attempting to obtain Master Agent information from address: 10.113.129.50 | 02-27-2018 14:13:00:511 - Master Agent uses Standard Security for Store : 207 | 02-27-2018 14:13:00:868 - Connection established with Master Agent |";

/* Samples
//Query
query {
  stores{
    id
    ipAddress
    hostName
    portNumber
    eventFilterFlags
    connectionStatus
    agents{
      id
    }
  }
}

//Specific
query {
  store(id:12){
    id
    ipAddress
    hostName
    portNumber
    eventFilterFlags
    connectionStatus
    agents{
      id
    }
  }
}

//log
query {
  storeLogs(id:12)
}

// Connection
mutation {
  storeAuthorize(input:{
    id: 1
    userName:"Test"
    password:"Test"
  }) {
    id
  }
}

// Unregister
mutation {
  storeUnregister(ids: [12, 13])
}


// Reconnect
mutation {
  storeReconnect(id: 12) {
    id
  }
}

mutation {
  storesReconnect(ids: [12, 13, 15])
}

// Update
mutation {
  storeUpdate(id:12, input:{
    hostName:"Test"
    portNumber:10149
    eventFilterFlags:FATAL_CRITICAL_MINOR
  }) {
    id
  }
}

// Add
mutation {
  storeRegister(input:{
    hostName:"Test"
    portNumber:10149
    eventFilterFlags:FATAL_CRITICAL_MINOR
  }) {
    id
  }
}

*/
