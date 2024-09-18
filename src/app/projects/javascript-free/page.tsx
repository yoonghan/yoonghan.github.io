"use client"

import { Accordion } from "@yoonghan/walcron-microfrontend-shared"
import "@yoonghan/walcron-microfrontend-shared/dist/style.css"

const JavascriptFree = ({}) => {
  return (
    <div className="walcron-container">
      <h1>Cross Browser Friendly</h1>
      <div>
        <p>
          A goal oriented page to make the page working in both{" "}
          <strong>No Javascript</strong>
          and javascript environment. Reason for no javascript is to support
          terminal typed browsers.
        </p>
        <p>
          The latter will be much more powerful, but it&apos;s important to
          still make it Javascript free.
        </p>
      </div>
      <article className="pt-8">
        <title>Accordian</title>
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
    </div>
  )
}

export default JavascriptFree
