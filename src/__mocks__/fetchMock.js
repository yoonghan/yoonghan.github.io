global.Response = class Response {
  responseMessage
  serverResponse

  constructor(responseMessage, serverResponse) {
    this.responseMessage = responseMessage
    this.serverResponse = serverResponse
    this.headers = serverResponse.headers
    this.status = serverResponse.status
  }

  text = async () => this.responseMessage
  json = async () => JSON.parse(this.responseMessage)
}

export const fetchMock = jest.fn()
fetchMock.mockResolvedValue({
  json: () => Promise.resolve({}),
})

global.fetch = fetchMock
