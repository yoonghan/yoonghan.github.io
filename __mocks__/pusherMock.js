jest.mock("pusher-js", () => {
  const Pusher = require("pusher-js-mock").PusherMock
  return Pusher
})
