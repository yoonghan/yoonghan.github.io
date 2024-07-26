"use client"

import { Accordion } from "@yoonghan/walcron-microfrontend-shared"
import "@yoonghan/walcron-microfrontend-shared/dist/style.css"

const JavascriptFree = ({}) => {
  return (
    <main>
      <h1>Are you able to free yourself from Javascript</h1>
      <div>
        <p>
          A goal oriented page to make the page working in both{" "}
          <strong>No Javascript</strong>
          and javascript environment.
        </p>
        <p>
          The latter will be much more powerful, but it&apos;s important to
          still make it Javascript free.
        </p>
      </div>
      <article>
        <h6>Accordian</h6>
        <Accordion
          model={[
            {
              label: "Item 1",
              content: "1 Lorem ipsum dolor sit amet!",
            },
            {
              label: "Item 2",
              content: "I am a content that has noting fancy!",
            },
          ]}
          groupName="faq"
        ></Accordion>
      </article>
    </main>
  )
}

export default JavascriptFree
