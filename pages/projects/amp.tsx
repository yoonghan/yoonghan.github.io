import Footer from "@/components/Footer"
import LogoText from "@/components/LogoText"
import Head from "next/head"

const AMP = () => {
  return (
    <>
      <Head>
        <title>Walcron, a testbed for developer&apos;s project.</title>
        <script
          async
          custom-element="amp-carousel"
          src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
        ></script>
        <script
          async
          custom-element="amp-video"
          src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
        ></script>
      </Head>
      <div className="container">
        <h1 className="title">
          Welcome to <LogoText /> Coorperation
        </h1>
        <p>
          We are developers who are keen to developer who like to experiment.
          Welcome (again) to Walcron Coorperation, with Google&apos;s
          Accelerated Mobile Page(s).
        </p>
        <section>
          <article>
            <div className={"title"}>How we create the website:</div>
            <amp-carousel
              id="carousel-with-preview"
              layout="fixed-height"
              height={400}
              type="slides"
              aria-label="Carousel with slide previews"
            >
              <div>
                <h2 className="title">Test Driven Development</h2>
                <p>
                  Test are written before the implementation(¯\_(ツ)_/¯). Old
                  components were written with new testcases for full code
                  coverage.
                </p>
                <p>
                  Only 1 SNAPSHOT test were ever taken for{" "}
                  <strong>React</strong>! (yes it&apos;s for html header)
                </p>
                <p>
                  It&apos;s an end-to-end <i>100% code coverage</i>.
                </p>
                <button on="tap:AMP.navigateTo(url='//github.com/yoonghan/Walcron/blob/master/README.md', target='_blank', opener='workflow')">
                  View Test Coverage
                </button>
              </div>
              <div>
                <h2 className="title">Github pull request</h2>
                <p>
                  All new commits{" "}
                  <strong>
                    <span className="strikethrough">MUST</span> HAVE
                  </strong>{" "}
                  to go thru a &quot;pull request&quot; -&gt; &quot;100%
                  validated&quot;
                </p>
                <p>
                  New commits have only 2 branches, master and develop to fit in{" "}
                  <strong>Continous Integration</strong> methodology.
                </p>
                <button on="tap:AMP.navigateTo(url='//github.com/yoonghan/Walcron/pull/45', target='_blank', opener='workflow')">
                  View Merged Request
                </button>
              </div>
              <div>
                <h2 className="title">Github Workflow</h2>
                <p>
                  During the pull-request, an automatically is carried out in
                  order:
                </p>
                <ol>
                  <li>Linting, Prettifier.</li>
                  <li>Type check build with NextJS.</li>
                  <li>Code test with coverage.</li>
                  <li>Publish code coverage for README tagging.</li>
                  <li>Validate previous vs latest User-Interface change.</li>
                </ol>
                <button on="tap:AMP.navigateTo(url='//github.com/yoonghan/Walcron/blob/master/.github/workflows/validator.yml', target='_blank', opener='workflow')">
                  View Merged Request
                </button>
              </div>
            </amp-carousel>
          </article>
        </section>
        <section key="short-clip-about-us">
          <div>
            <h2>A Video About Us</h2>
            <amp-video width="640" height="360" layout="responsive">
              <source src="/movie/about-walcron.mp4" type="video/mp4" />
              <div fallback="">
                <p>This browser does not support the video element.</p>
              </div>
            </amp-video>
          </div>
        </section>
        <section>
          Currently we are still in development phase for <strong>AMP</strong>.
        </section>
        <Footer />
      </div>
      <style jsx>{`
        .container {
          max-width: 1024px;
          padding: 1rem;
          margin: 0 auto;
        }
        .amp-carousel-slide {
          padding: 80px;
        }
        section {
          padding-bottom: 3rem;
        }
      `}</style>
    </>
  )
}
export const config = { amp: true }

export default AMP
