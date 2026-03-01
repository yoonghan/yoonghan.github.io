"use client"

import LetterBox from "@/components/LetterBox"
import Profiler from "@/components/Profiler"
import ScrollToTop from "@/components/ScrollToTop"
import hanImg from "@/images/profile/han.webp"
import gladysImg from "@/images/profile/gladys.webp"
import { MiniMenu } from "@yoonghan/walcron-microfrontend-shared"
import "@yoonghan/walcron-microfrontend-shared/dist/style.css"
import Grid from "@/components/Grid"
import Image from "next/image"
import { aiCertificates } from "./config/aiCertificates"
import { cloudCertificates } from "./config/cloudCertificates"
import { otherDeveloperCertificates } from "./config/otherDeveloperCertificates"
import StickyCards from "@/components/StickyCards"

const authorModel = [
  {
    hashId: "about",
    title: "About Us",
  },
  {
    hashId: "founders",
    title: "Founders",
  },
  {
    hashId: "certification",
    title: "Certifications",
  },
]

const About = () => {
  return (
    <div className={`container mx-auto`}>
      <MiniMenu model={authorModel} />

      <div className="max-w-screen-lg px-4 py-8 mx-auto">
        <article id={authorModel[0].hashId} className="py-20">
          <h1 className="text-2xl text-center pb-12">{authorModel[0].title}</h1>
          <p>
            <strong>Walcron</strong> is a by-product of a couple&apos;s journey
            in the IT industry, with the main purpose of sharing our knowledge
            and experience with the world. We are also experimenting with new
            web technologies and occasionally contributing these learnings back
            to our <em>9-to-5 office-facing jobs</em> and the{" "}
            <em>open-source</em> community.
          </p>
          <p className="pt-8">
            The development journey of Walcron has enabled us to learn and
            consult on search analytics and API integrations, and to develop
            user experiences that were previously out-of-scope for internal
            websites.
          </p>
          <p className="pt-8">
            With the current trend of AI, we are also exploring and
            experimenting with AI technologies to improve our development
            process and user experience.
          </p>
          <figure className="text-center pt-8">
            <Image
              src="/img/welcome/walcron-2-authors.webp"
              width={454}
              height={403}
              alt="Walcron Web Authors"
              className="m-auto"
              priority={true}
            />
            <Image
              src="/img/arrow.svg"
              className="md:block w-4 -my-1 relative z-10 mx-auto border-0"
              aria-hidden={true}
              alt="Description arrow"
              width={50}
              height={100}
            />
            <figcaption className="italic">This is us</figcaption>
          </figure>
        </article>
        <article id={authorModel[1].hashId} className="py-20">
          <h2 className="text-2xl text-center pb-12">{authorModel[1].title}</h2>
          <Profiler
            profiles={[
              {
                name: "Han Yoong",
                title: "Developer & Tech Visionary",
                description: (
                  <p>
                    A passionate coder who is currently stuck in the proprietary
                    software and hardware industry. In his free time, he reads
                    and experiments with new ways to improve the publicity of{" "}
                    <i>Walcron Cooperation</i>. He has also been contributing to
                    Stack Overflow and sharing write-ups on GitHub.
                  </p>
                ),
                imgSrc: hanImg,
              },
              {
                name: "Gladys Tai",
                title: "Project & Delivery Specialist",
                description: (
                  <p>
                    Gladys is a results-oriented leader who excels at navigating
                    complex projects. Her meticulous attention to detail and
                    commitment to quality ensure that every project she delivers
                    is a success.
                  </p>
                ),
                imgSrc: gladysImg,
              },
            ]}
          />
        </article>
        <article id={authorModel[2].hashId} className="py-20">
          <h3 className="text-2xl text-center pb-12">{authorModel[2].title}</h3>
          <div>
            <h4 className="text-xl text-center pb-8">Cloud Certification</h4>
            <Grid items={cloudCertificates} />
          </div>
          <div>
            <h4 className="text-xl text-center py-8">AI Certification</h4>
            <Grid items={aiCertificates} />
          </div>
          <div>
            <h4 className="text-xl text-center py-8">
              Other developer certifications
            </h4>
            <StickyCards contents={otherDeveloperCertificates} />
          </div>
        </article>
        <hr />
        <div className="py-8">
          <LetterBox />
        </div>
        <ScrollToTop />
      </div>
    </div>
  )
}

export default About
