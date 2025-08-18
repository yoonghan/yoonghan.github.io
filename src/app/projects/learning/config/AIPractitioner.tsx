"use client"

import { Accordion } from "@yoonghan/walcron-microfrontend-shared"

const model = [
  {
    label: "AI Practitioner",
    content: (
      <div>
        <a href="https://github.com/users/yoonghan/projects/6">
          Linked Notes to AWS Certified AI Practitioner.
        </a>
        ,
        <br />
        Practically learned:
        <ul>
          <li>Machine Learning and Terminology</li>
          <li>Prompt Engineering</li>
          <li>AWS AI Services</li>
        </ul>
      </div>
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
