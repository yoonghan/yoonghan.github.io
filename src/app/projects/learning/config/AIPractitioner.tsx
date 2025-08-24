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
                <p>
                  Describe your task, specifying a persona and format
                  preference.
                  <ol>
                    <li>Give a persona (optional)</li>
                    <li>Define the task</li>
                    <li>Define the output/format</li>
                  </ol>
                </p>
              ),
            },
            {
              input: "Context",
              reference: (
                <p>
                  Specify goals, constraints, and requirements. Context has the
                  potential to be the longest piece of a prompt. One of the most
                  powerful and reliable ways to provide an AI tool with context
                  is to give the model specific reference materials to use.
                  <ul>
                    <li>Persona</li>
                    <li>I would like...</li>
                    <li>Use this template...</li>
                  </ul>
                  <strong>Tips:</strong>{" "}
                  {"Don't use gender bias. E.g. firefighter not fireman."}
                </p>
              ),
            },
            {
              input: "Reference",
              reference: (
                <p>
                  Add examples, zero/single/few shots for gen AI tool can use to
                  inform its output. Use:
                  <ul>
                    <li>Transitional phase, i.e. use this template</li>
                    <li>Markdown tags</li>
                    <li>XML</li>
                  </ul>
                </p>
              ),
            },
            {
              input: "Evaluate",
              reference:
                "evaluate the output to identify opportunities for improvement.",
            },
            {
              input: "Iterate",
              reference:
                "Iterate on your initial prompt to attain those improvements.",
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
          <p>
            Output expectation / control:
            <ol>
              <li>Revisit the prompting framework - add personas, context</li>
              <li>
                Break the prompt into shorter sentences - chain of thoughts
              </li>
              <li>Introduce contrainsts</li>
              <li>Tweak your phrasing / swith analogous task</li>
            </ol>
          </p>
        </section>
      </div>
    ),
  },
  {
    label: "Prompt Engineering - Images",
    content: (
      <div>
        Important are the following:
        <ul>
          <li>Subject</li>
          <li>Format</li>
          <li>Size</li>
          <li>Color</li>
          <li>Asthetics</li>
        </ul>
        <br />
        Example: Use LLM to generate prompt for image generation. I.e. create a
        poster. Then using that prompt to generate an image, remember to set the
        a format. E.g.
        <pre>
          {`
        Generate a poster for a music concert <- task
        The image should be photorealistic <- format
        The poster should display a sense of excitement and energy <- aesthetics
        The color scheme should be vibrant and eye-catching <- color
        The poster should be in portrait orientation <- format
        The poster should include the following text: "Live in Concert: The Rocking Band" <- context
        The poster should be 24 inches by 36 inches in size <- size
      `}
        </pre>
      </div>
    ),
  },
  {
    label: "Prompt Engineering - Multimodal",
    content: <div>Add all the images or url required.</div>,
  },
  {
    label: "Prompt Engineering - Risks",
    content: (
      <div>
        <ul>
          <li>
            Protecting privacy: Removes potentially sensitive information from
            previous interactions.
          </li>
          <li>
            Avoiding bias: Prevents the tool from carrying forward assumptions
            or stereotypes from earlier prompts.
          </li>
          <li>
            Reducing confusion: Ensures the tool focuses solely on the current
            task and context.
          </li>
          <li>
            Troubleshooting: Refreshes the tool when it seems stuck or is
            producing unexpected results.{" "}
          </li>
        </ul>
        <Table
          headers={["Risk", "Mitigation"]}
          list={[
            {
              Risk: "Bias",
              Mitigation: (
                <ul>
                  <li>Diversify</li>
                  <li>Audit by Challenge Assumption</li>
                </ul>
              ),
            },
            {
              Risk: "Hallucination",
              Mitigation: (
                <ul>
                  <li>Fact check</li>
                  <li>Use clear detail explanations</li>
                </ul>
              ),
            },
            {
              Risk: "Inconsistency and relevance",
              Mitigation: (
                <div>
                  Example of word: &quot;Think outside the box&quot;
                  <ul>
                    <li>Provide references</li>
                    <li>Provide context</li>
                    <li>Use few shot examples</li>
                    <li>Break down complex tasks</li>
                  </ul>
                </div>
              ),
            },
            {
              Risk: "Responsibility",
              Mitigation: (
                <ul>
                  <li>Consider use of AI</li>
                  <li>Approval of using AI</li>
                  <li>Security and implications</li>
                  <li>Evaluate generated content</li>
                  <li>Disclose use of AI</li>
                </ul>
              ),
            },
          ]}
        />
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
