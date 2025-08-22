"use client"

import Table from "@/components/Table"
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
  {
    label: "Prompt Engineering",
    content: (
      <div>
        <a href="https://www.coursera.org/learn/google-start-writing-prompts-like-a-pro">
          Learning Prompt Engineering with Google
        </a>
        <Table
          list={[
            {
              input: "Task",
              reference: (
                <ol>
                  <li>Define the task</li>
                  <li>Define the output</li>
                </ol>
              ),
            },
            {
              input: "Context",
              reference: (
                <p>
                  Specify goals, constraints, and requirements.
                  <ul>
                    <li>Persona</li>
                    <li>I would like...</li>
                    <li>Use this template...</li>
                  </ul>
                </p>
              ),
            },
            {
              input: "Reference",
              reference: "Add examples, zero/single/few shots. ",
            },
            {
              input: "Evaluate",
              reference: "Always evaluate the output",
            },
            {
              input: "Iterate",
              reference: "Always reiterate",
            },
          ]}
          headers={["Input Prompt", "Reference"]}
        />
        <section className="mt-4">
          Example:
          <pre>
            {`
          I want to surprise my friend with a birthday meal. <- why task
          Can you suggest a Gourmet chef <- task
          I want a list of vegetarian food menu item. <- task/context
          She prefes Italian food, and she is allergic to nuts. <- context
          She is a vegetarian. <- context
          She is a fan of pasta. <- context/reference
          I want asian cuisine like Dim Sum. <- reference
          I know Ching Chong restaurant is good in serving Dim Sum. <- reference`}
          </pre>
          <p className="mt-2">
            I want a gourmet chef suggestion for a list of vegetarian food menu
            to bring my Chinese friend for a surprised dinner. She prefers Asian
            food. Could you suggest a menu list? I would prefer to bring her to
            a dim sum restaurant similar to Ching Chong restaurant located in
            Los Angeles.
          </p>
          <p className="mt-2">
            I am tight on budget, so list me 2 menu and no appetizer.
          </p>
        </section>
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
