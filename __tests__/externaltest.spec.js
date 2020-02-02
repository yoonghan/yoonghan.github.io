describe('External tools mock', () => {
  it('fetch can extract', async () => {
    const mockResult = {success: "ok"};
    const mockFetchPromise = Promise.resolve({json:()=>Promise.resolve(mockResult)})
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
    fetch("http://www.google.co.uk")
    .then(resp => resp.json())
    .then(data => {
        expect(data).toBe(mockResult);
        expect(data).not.toBe({success: "fail"});
    });
  })
});
