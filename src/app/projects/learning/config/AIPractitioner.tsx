"use client"

import { Accordion } from "@yoonghan/walcron-microfrontend-shared"

const model = [
  {
    label: "Update",
    content: (
      <ul>
        <li>AWS Ai Practitioner</li>
        <li>Prompt Engineering</li>
      </ul>
    ),
  },
]

export function AIPractitioner() {
  return (
    <article>
      <p className="text-2xl">Artificial Intelligence Practitioner</p>
      <Accordion model={model} groupName={"ai"} />
    </article>
  )
}
