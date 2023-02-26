import { NextApiRequest, NextApiResponse } from "next"
import { execute } from "./_cron"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Content-Type", "application/json")
  const { view } = req.query
  let response = await execute(view)
  res.status(response.status).json(await response.json())
}

export const config = { runtime: "nodejs" }

export default handler
