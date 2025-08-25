"use client"

import LetterBox from "@/components/LetterBox"
import Profiler from "@/components/Profiler"
import ScrollToTop from "@/components/ScrollToTop"
import hanImg from "@/images/profile/han.webp"
import gladysImg from "@/images/profile/gladys.webp"
import { MiniMenu } from "@yoonghan/walcron-microfrontend-shared"
import "@yoonghan/walcron-microfrontend-shared/dist/style.css"
import StickyCards from "@/components/StickyCards"
import Image from "next/image"
import { cloud_certificates } from "./config/cloudcertificates"

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
                description: (
                  <p>
                    A passionate coder who is now stuck in a proprietery
                    software and hardware industry. In his free time, he spends
                    time to read and experiment new ways to improve the{" "}
                    <i>Walcron Cooperation</i> publicity. He has been
                    contributing to Stackoverflow and sharing write-ups in
                    Github.
                    <br />
                    <br />
                    <i>An enthusiast programmer.</i>
                  </p>
                ),
                imgSrc: hanImg,
              },
              {
                name: "Gladys Tai",
                description: (
                  <p>
                    An achiever with a bad-ass attitude. She always complains
                    that she wouldn&apos;t make it in time or the task are too
                    complex to handle. However,{" "}
                    <i>
                      all the projects that was/has been delivered by her are
                      faultless.
                    </i>{" "}
                    As a girl, she spends most of her time being presentable.
                    <br />
                    <br />
                    <i>She is a worrier and a warrior.</i>
                  </p>
                ),
                imgSrc: gladysImg,
              },
            ]}
          />
        </article>
        <article id={authorModel[3].hashId} className="py-20">
          <h3 className="text-2xl text-center pb-6">{authorModel[3].title}</h3>

          <h4 className="text-xl text-center py-6">Cloud Certifications</h4>
          <div className="relative">
            <StickyCards contents={cloud_certificates} />
          </div>
          <h4 className="text-xl text-center py-12">
            Programming Certifications
          </h4>
          <div className="relative">
            <StickyCards
              contents={[
                {
                  className: "bg-blue-400",
                  title: "Functional Programming Principal In Scala",
                  description: (
                    <span>
                      Functional programming with compose, synthentic sugar and
                      immutability.
                    </span>
                  ),
                  href: "https://www.coursera.org/account/accomplishments/verify/8CPTGHDQS6",
                },

                {
                  className: "bg-blue-300",
                  title: "Sun Java Certified",
                  description: <span>Certification on Java programmer.</span>,
                },
                {
                  className: "bg-blue-200",
                  title: "Webassembly with RUST programming",
                  description: (
                    <span>
                      Rusty but worky on RUST programming with javascript.
                    </span>
                  ),
                },
                {
                  className: "bg-purple-500",
                  title: "Google - Speed Up Data Analysis and Presentation Building",
                  description: (
                    <span>
                      Apply the prompting framework to draft text content, help
                      with brainstorming, create tables and timelines, and
                      summarize lengthy text.
                    </span>
                  ),
                  href: "https://coursera.org/share/440ea2485ea1ad0349c285bd5b7c6230",
                },
                {
                  className: "bg-purple-400",
                  title: "Google - Design Prompts for Everyday Work Tasks",
                  description: (
                    <span>
                      Apply the prompting framework to draft text content, help
                      with brainstorming, create tables and timelines, and
                      summarize lengthy text.
                    </span>
                  ),
                  href: "https://coursera.org/share/440ea2485ea1ad0349c285bd5b7c6230",
                },
                {
                  className: "bg-purple-300",
                  title: "Google - Start Writing Prompts like a Pro",
                  description: (
                    <span>
                      Recognize and apply the prompting framework (task,
                      context, references, evaluate, iterate) to create
                      effective prompts.
                    </span>
                  ),
                  href: "https://coursera.org/share/444aae878ac4ad451e8339cb399ffe84",
                },
                {
                  className: "bg-orange-200",
                  title: "Introduction to Github Copilot",
                  description: (
                    <span>Use Gitlab Co-pilot for Python programming.</span>
                  ),
                  href: "https://www.coursera.org/account/accomplishments/verify/ATLFGOBTUICD",
                },
                {
                  className: "bg-orange-100",
                  title: "Effective ChatGPT",
                  description: (
                    <span>
                      Learning ChatGPT.{" "}
                      <a href="https://www.credly.com/badges/90c47b88-4325-4611-be46-f6b0ca688251">
                        [ Foundation ]
                      </a>
                    </span>
                  ),
                  href: "https://www.credly.com/badges/395a3138-11d3-4144-94dd-2389c52213aa",
                },
                {
                  className: "bg-green-400",
                  title: "Samurai Leadership",
                  description: <span>Samurai Leadership - Green Belt.</span>,
                  href: "/certs/samurai-leadership-yoong-han.pdf",
                },
              ]}
            />
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
