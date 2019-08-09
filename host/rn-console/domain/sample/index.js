var CountrySample = require("./country");
var RegionSample = require("./region");
var StoreSample = require("./store");
var AgentSample = require("./agent");
var InventorySample = require("./inventory");
var {ConnectionLog} = require("./store");

module.exports = {
  mock: true,
  CountrySample: CountrySample,
  RegionSample: RegionSample,
  StoreSample: StoreSample,
  StoreConnectionLog: ConnectionLog,
  AgentSample: AgentSample,
  InventorySample: InventorySample
}
