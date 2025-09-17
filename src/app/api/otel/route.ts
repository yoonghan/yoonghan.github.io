import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const response = await fetch("https://api.axiom.co/v1/traces", {
      method: "POST",
      headers: {
        "Content-Type": req.headers.get("Content-Type") || "application/json",
        Authorization: `Bearer ${process.env.AXIOM_API_TOKEN}`,
        "X-Axiom-Dataset": `${process.env.AXIOM_DATASET_NAME}`,
      },
      body: req.body,
    })

    if (response.ok) {
      return new NextResponse(response.body, {
        status: response.status,
      })
    } else {
      const errorText = await response.text()
      // eslint-disable-next-line no-console
      console.error("Axiom API Error:", errorText)
      return new NextResponse(errorText, {
        status: response.status,
      })
    }
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error("Error forwarding to Axiom:", error)
    return new NextResponse(error.message, { status: 500 })
  }
}
