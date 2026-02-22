"use client"

import Table from "@/components/Table"
import { Accordion } from "@yoonghan/walcron-microfrontend-shared"

const model = [
  {
    label: "Update",
    content: (
      <Table
        list={[
          {
            input: "npm install 'packages@version'",
            reference: "# update to latest but based on ~, ^,",
          },
          {
            input: "npm update 'packages'",
            reference:
              "Updates work even on sub-project like jose in firebase-admin",
          },
          {
            input: "npm audit fix",
            reference: "Fix security issues",
          },
          {
            input: "npm ls 'package'",
            reference: "List installed package and dependencies",
          },
        ]}
        headers={["Command", "Reference"]}
      />
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
