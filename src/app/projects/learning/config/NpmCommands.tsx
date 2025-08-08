"use client"

import { Accordion } from "@yoonghan/walcron-microfrontend-shared"

const model = [
  {
    label: "Update",
    content: (
      <ul>
        <li>
          npm install &quot;packages@version&quot; # works for even override,
          update to specific version
        </li>
        <li>
          npm update &quot;packages&quot; # update to latest but based on ~, ^,
          works even on sub-project like jose in firebase-admin
        </li>
        <li>npm audit fix # fix security and may break</li>
        <li>npm ls &quot;package&quot; # list dependency</li>
      </ul>
    ),
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
