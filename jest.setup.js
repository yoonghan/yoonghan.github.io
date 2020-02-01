/**
 * Declare global variables needed for mocks
 **/

function mockFetch(data) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
}

global.fetch = mockFetch;
