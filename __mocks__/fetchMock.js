global.Response = class Response {
  responseMessage
  headers

  constructor(responseMessage, headers) {
    this.responseMessage = responseMessage
    this.headers = headers
  }

  text = async () => this.responseMessage
}
