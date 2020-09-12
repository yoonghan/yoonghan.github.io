class Client {
  bind = (name, callback) => {
    callback({message: "mock message"})
  }
}

class Connection {
  bind = (state, callback) => {
    switch(state) {
      case "connected":
        return callback({message: "mock connected"});
      case "disconnected":
        return callback({message: "mock disconnected"});
      case "failed":
        return callback({message: "mock failed"});
      case "error":
        return callback({message: "mock failed"});
    }
  }
}

class Pusher {
  constructor() {
    this.connection = new Connection();
  }

  subscribe = () => {
    return new Client();
  }
}

export default Pusher;
