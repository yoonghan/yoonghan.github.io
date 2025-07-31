"use client"

import { Accordion } from "@yoonghan/walcron-microfrontend-shared"

const model = [
  {
    label: "Update",
    content:
    <ul>
      <li>npm install "packages@version" # works for even override, update to specific version</li>
      <li>npm update "packages" # update to latest but based on ~, ^</li>
      <li>npm audit fix # fix security and may break</li>
      <li>npm ls "package" # list dependency</li>
    </ul>
  },
]

export function NpmCommands() {
  return (
    <article>
      <p className="text-2xl">NPM Commands</p>
      <Accordion model={model} groupName={"commands"} />
    </article>
  )
}
