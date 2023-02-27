import { NextApiRequest, NextApiResponse } from "next"
import { execute } from "@/pageComponents/api/cron/module"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Content-Type", "application/json")
  const { view } = req.query
  let response = await execute(view, req.method)
  res.status(response.status).json(await response.json())
}

export const config = { runtime: "nodejs" }

export default handler
