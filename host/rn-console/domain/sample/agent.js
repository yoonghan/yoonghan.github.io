module.exports = [
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
  },
  {
    id: 13,
    agentMOId: "WinStore-Sys25Win10IoT19",
    agentVersion: "V3R2.1",
    agentType: "General Agent",
    deviceId: "Sys25Win10IoT16",
    systemId: "ma-Sys25Win10IoT16.10150",
    ipAddress: "12.204.204.12",
    is64bitOS: true,
    mgmtPort: "10150",
    connectionStatus: "connected",
    storeId: 12,
    maMOId: "WinStore-Sys25Win10IoT16",
    agentAuthState: "unauthenticated",
    deviceType: 17,
    modelType: 6140,
    modelNumber: 145,
    MACAddress: "JC",
    networkMask: "255.255.255.0",
    isMasked: false,
    isMCF: false,
    osValue: 86
  },
  {
    id: 14,
    agentMOId: "Store01-Sys25Win10IoT17",
    agentVersion: "V3R2.1",
    agentType: "Master Agent",
    deviceId: "Sys25Win10IoT16",
    systemId: "ma-Sys25Win10IoT16.10150",
    ipAddress: "12.204.204.12",
    is64bitOS: true,
    mgmtPort: "10150",
    connectionStatus: "connected",
    storeId: 13,
    maMOId: "Store01-Sys25Win10IoT16",
    agentAuthState: "authenticated",
    deviceType: 17,
    modelType: 6140,
    modelNumber: 145,
    MACAddress: "JC",
    networkMask: "255.255.255.0",
    isMasked: false,
    isMCF: false,
    osValue: 86
  },
  {
    id: 15,
    agentMOId: "Store01-Sys25Win10IoT18",
    agentVersion: "V3R2.1",
    agentType: "General Agent",
    deviceId: "Sys25Win10IoT16",
    systemId: "ma-Sys25Win10IoT16.10150",
    ipAddress: "12.204.204.12",
    is64bitOS: false,
    mgmtPort: "10150",
    connectionStatus: "connected",
    storeId: 13,
    maMOId: "Store01-Sys25Win10IoT16",
    agentAuthState: "authenticated",
    deviceType: 17,
    modelType: 6140,
    modelNumber: 145,
    MACAddress: "JC",
    networkMask: "255.255.255.0",
    isMasked: false,
    isMCF: false,
    osValue: 86
  },
  {
    id: 16,
    agentMOId: "Linux-Sys25Linux10IoT21",
    agentVersion: "V3R2.2",
    agentType: "Master Agent",
    deviceId: "Sys25Win10IoT16",
    systemId: "ma-Sys25Win10IoT16.10150",
    ipAddress: "12.204.204.12",
    is64bitOS: false,
    mgmtPort: "10150",
    connectionStatus: "disconnected",
    storeId: 14,
    maMOId: "Linux-Sys25Win10IoT16",
    agentAuthState: "authenticated",
    deviceType: 17,
    modelType: 6140,
    modelNumber: 145,
    MACAddress: "JC",
    networkMask: "255.255.255.0",
    isMasked: false,
    isMCF: false,
    osValue: 86
  },
  {
    id: 17,
    agentMOId: "Store01-Sys25Linux10IoT21",
    agentVersion: "V3R2.2",
    agentType: "General Agent",
    deviceId: "Sys25Win10IoT17",
    systemId: "ma-Sys25Win10IoT16.10150",
    ipAddress: "12.204.204.12",
    is64bitOS: false,
    mgmtPort: "10150",
    connectionStatus: "disconnected",
    storeId: 12,
    maMOId: "Linux-Sys25Win10IoT16",
    agentAuthState: "authenticated",
    deviceType: 12,
    modelType: 6140,
    modelNumber: 145,
    MACAddress: "JC",
    networkMask: "255.255.255.0",
    isMasked: false,
    isMCF: false,
    osValue: 86
  },
  {
    id: 18,
    agentMOId: "Store01-Sys25Linux10IoT21",
    agentVersion: "V3R2.2",
    agentType: "General Agent",
    deviceId: "Sys25Win10IoT17",
    systemId: "ma-Sys25Win10IoT16.10150",
    ipAddress: "12.204.204.12",
    is64bitOS: false,
    mgmtPort: "10150",
    connectionStatus: "disconnected",
    storeId: 12,
    maMOId: "Linux-Sys25Win10IoT16",
    agentAuthState: "authenticated",
    deviceType: 12,
    modelType: 6140,
    modelNumber: 145,
    MACAddress: "JC",
    networkMask: "255.255.255.0",
    isMasked: false,
    isMCF: false,
    osValue: 86
  }
];

/*
// Query
query {
  agents {
		id
    agentMOId
    agentVersion
    agentType
    deviceId
    systemId
    ipAddress
    is64bitOS
    mgmtPort
    connectionStatus
    storeId
    maMOId
    agentAuthState
    deviceType
    modelType
    modelNumber
    MACAddress
    networkMask
    isMasked
    isMCF
    osValue
  }

// Via Store
query {

  agentsByStoreId(storeId:12) {
		id
    agentMOId
    agentVersion
    agentType
    deviceId
    systemId
    ipAddress
    is64bitOS
    mgmtPort
    connectionStatus
    storeId
    maMOId
    agentAuthState
    deviceType
    modelType
    modelNumber
    MACAddress
    networkMask
    isMasked
    isMCF
    osValue
  }
}

// Per Agent
query {

  agent(id:12) {
		id
    agentMOId
    agentVersion
    agentType
    deviceId
    systemId
    ipAddress
    is64bitOS
    mgmtPort
    connectionStatus
    storeId
    maMOId
    agentAuthState
    deviceType
    modelType
    modelNumber
    MACAddress
    networkMask
    isMasked
    isMCF
    osValue
  }

}

//Delete
  agentDelete(id:12)
  agentDelete(id:18)

}
*/
