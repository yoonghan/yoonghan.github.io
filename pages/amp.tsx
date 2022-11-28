import Footer from "@/components/Footer"
import LogoText from "@/components/LogoText"
import Head from "next/head"
import { siteDevelopmentSections } from "@/pageComponents/Homepage/config"

/** Ignore anything that starts with amp. */
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
              {siteDevelopmentSections.map((siteDevelopment) => {
                if (siteDevelopment.skip) return null
                return (
                  <div key={siteDevelopment.id}>
                    <h2 className="title">{siteDevelopment.title}</h2>
                    {siteDevelopment.desc}
                    {siteDevelopment.link && (
                      <button
                        on={`tap:AMP.navigateTo(url='${siteDevelopment.link.src}', target='_blank', opener='workflow')`}
                      >
                        {siteDevelopment.link.label}
                      </button>
                    )}
                  </div>
                )
              })}
            </amp-carousel>
          </article>
        </section>
        <section key="short-clip-about-us">
          <div>
            <h2>A Video About Us</h2>
            <amp-video
              width="640"
              height="360"
              layout="responsive"
              poster="/img/welcome/girl-in-glass.webp"
            >
              <source src="/movie/about-walcron.mp4" type="video/mp4" />
              <div fallback="">
                <p>This browser does not support the video element.</p>
              </div>
            </amp-video>
          </div>
        </section>
        <section>Currently we are still in development phase for AMP.</section>
        <hr />
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
