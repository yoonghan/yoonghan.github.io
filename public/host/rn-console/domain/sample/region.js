module.exports = [
  {
    id: 12,
    name: "West",
    storeIds: [12, 13]
  },
  {
    id: 13,
    name: "East",
    storeIds: [14]
  }
];

/*
// Insert
mutation {
  regionCreate(input: {
    name: "Europe"
    storeIds: [12, 13]
  }){
    id
    name
  }
}

// Update
mutation {
  regionUpdate(id:1, input: {name: "Europe", storeIds: [12, 13]}) {
    id
    name
  }
}

// Query
query {
  regions {
    id
    name
    storeIds
  }
}

query {
  region(id:12) {
    id
    name
    storeIds
  }
}

query {
  region(id:12) {
    id
    name
    storeIds
    stores{
      id
    }
  }
}
*/
