"use client"

import { Accordion } from "@yoonghan/walcron-microfrontend-shared"

const model = [
  {
    label: "Collections",
    content:
      "Old collection without streaming/parallel capabilites with Java 1.2.",
  },
]

export function SunJavaDeveloperArticle() {
  return (
    <article>
      <p className="text-2xl">Sun Java Certified</p>
      <Accordion model={model} groupName={"sun-java-certified"} />
    </article>
  )
}
