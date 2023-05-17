"use client"

import LogoText from "@/components/LogoText"
import Head from "next/head"
import { siteDevelopmentSections } from "@/pageComponents/Homepage/config"

/** Broken, think to exclude amp */

/** Ignore anything that starts with amp. */
const Amp = () => {
  return (
    <>
      <Head>
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
        <div className="pb-3">
          <article>
            <h2 className={"title"}>How we create the website:</h2>
            <amp-carousel
              id="carousel-with-preview"
              layout="fixed-height"
              height={500}
              type="slides"
              aria-label="Carousel with slide previews"
            >
              {siteDevelopmentSections.map((siteDevelopment) => {
                if (siteDevelopment.skip) return null
                return (
                  <div key={siteDevelopment.id}>
                    <h3 className="title">{siteDevelopment.title}</h3>
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
        </div>
        <section key="short-clip-about-us" className="pb-3">
          <h2>A Video About Us</h2>
          <amp-video
            controls=""
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
        </section>
        <div className="pb-3">
          Currently we are still in development phase for AMP.
        </div>
        <hr />
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
        .pb-3 {
          padding-bottom: 3rem;
        }
      `}</style>
    </>
  )
}

export default Amp
