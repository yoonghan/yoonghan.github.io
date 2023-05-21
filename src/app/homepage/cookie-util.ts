"use server"

import { cookies } from "next/headers"

export const updateCookie = async () => {
  //@ts-ignore
  cookies().set("termsRead", true, { secure: true })
}
