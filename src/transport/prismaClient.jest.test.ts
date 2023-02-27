import prisma from "./prismaClient"

describe("Prisma Client", () => {
  it("should be able to return a prisma mock client with tables defined", () => {
    const client = prisma
    expect(client.cronJob).toBeDefined()
  })
})
