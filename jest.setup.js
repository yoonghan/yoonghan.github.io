/**
 * Declare global variables needed for mocks
 **/

function mockFetch(data) {
  return jest.fn().mockImplementation(() => {});
}

global.fetch = mockFetch;
