/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { site } from "@/config/site"

export const metadata = {
  title: "Accessibility (WCAG)",
  description: "Testing aria",
  alternates: {
    ...site.generateCanonical("/experiments/aria"),
  },
}

function Aria() {
  return (
    <div className="p-16">
      <h1>{metadata.title}</h1>
      <p> Placeholder to test aria</p>

      <section className="py-4">
        <strong>Test aria-labelledby</strong>
        <div>
          <div aria-label="Fancy Label" id="sec-1">
            Fancy Label
          </div>
          <div aria-labelledby="sec-1" tabIndex={0}>
            Will read {'"Fancy Label"'}
          </div>
        </div>
      </section>

      <section className="py-4">
        <strong>Test aria-describedby</strong>
        <div>
          <div aria-label="Fancy Label" id="sec-2">
            Fancy Label 2
          </div>
          <div aria-describedby="sec-2" tabIndex={0}>
            {"Doesn't"} work
          </div>
        </div>
      </section>

      <div className="py-4">
        <em>Notes:</em> Voice over <strong>do not</strong> work with:
        <ol className="list-decimal ml-4">
          <li>aria-describedby</li>
          <li>aria-controls</li>
        </ol>
      </div>
    </div>
  )
}

export default Aria
