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

const authorModel = [
  {
    hashId: "about",
    title: "About Us",
  },
  {
    hashId: "consultation",
    title: "What do we do?",
  },
  {
    hashId: "founders",
    title: "Founders",
  },
  {
    hashId: "certification",
    title: "Certification",
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
            in IT industry. The <strong>Walcron</strong> website was created for
            experimentation in optimizing and prototyping new Web technologies.
            Ocassionally this is being re-contributed back into our{" "}
            <em>9-to-5 office facing jobs</em> and <em>open-source</em>{" "}
            community.
          </p>
          <p className="pt-8">
            The development journey to Walcron has so far lead us to learn and
            was able to consult on search-analytics, api integrations and
            develop user-experience that was so far out-of-scope in internal
            websites.
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
          <p>
            We provide consultation on software development. Provide us your
            contact information and we will reach out to you.
          </p>
          <p className="pb-4">Things we had done in the past:</p>
          <ul className="list-disc ml-4">
            <li>
              Maintain and improve high volume (35 million records) data
              transactions and synchronization.
            </li>
            <li>E-Commerce and Non-government organization websites.</li>
            <li>Quick mock-ups and builds for clients.</li>
            <li>Code coverage and system stability.</li>
            <li>
              Integration of Business-to-Business and Business-to-Consumer.
            </li>
            <li>DevOps from development, integration to deployment.</li>
          </ul>
        </article>
        <article id={authorModel[2].hashId} className="py-20">
          <h3 className="text-2xl text-center pb-12">{authorModel[2].title}</h3>
          <Profiler
            profiles={[
              {
                name: "Han Yoong",
                title: "Lead Developer & Tech Visionary",
                description: (
                  <p>
                    A passionate coder who is now stuck in a proprietery
                    software and hardware industry. In his free time, he spends
                    time to read and experiment new ways to improve the{" "}
                    <i>Walcron Cooperation</i> publicity. He has been
                    contributing to Stackoverflow and sharing write-ups in
                    Github.
                  </p>
                ),
                imgSrc: hanImg,
              },
              {
                name: "Gladys Tai",
                title: "Project & Delivery Lead",
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
        <article id={authorModel[3].hashId} className="py-20">
          <h3 className="text-2xl text-center pb-12">{authorModel[3].title}</h3>
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
            <Grid items={otherDeveloperCertificates} />
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
