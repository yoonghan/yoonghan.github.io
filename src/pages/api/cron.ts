import { NextApiRequest, NextApiResponse } from "next"
import { execute } from "@/pageComponents/api/cron/module"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Content-Type", "application/json")
  const { action } = req.query
  let response = await execute(action, req.method)
  res.status(response.status).json(await response.json())
}

export const config = { runtime: "nodejs" }

export default handler
