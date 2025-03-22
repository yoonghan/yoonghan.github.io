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
          <h3 className="text-2xl text-center pb-12">{authorModel[3].title}</h3>
          <div className="relative">
            <StickyCards
              contents={[
                {
                  imageUrl:
                    "https://d1.awsstatic.com/certification/badges/AWS-Certified-Solutions-Architect-Associate_badge_150x150.e359ae4a6d4d82c3e31d4f9104c8d389b56a2423.png",
                  className: "bg-blue-400",
                  title: "AWS Solution Architect Associate",
                  href: "https://www.credly.com/badges/964f2164-02ab-469c-b964-a01c2210ef24",
                },
                {
                  imageUrl:
                    "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg",
                  className: "bg-blue-300",
                  title: "Azure Administrator Associate (AZ-104)",
                  href: "https://learn.microsoft.com/api/credentials/share/en-us/HanYoong-5994/AE5F2EC02868991B?sharingId=FE2E719D4C5E0EFB",
                },
                {
                  imageUrl:
                    "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Developer-Associate_badge.5c083fa855fe82c1cf2d0c8b883c265ec72a17c0.png",
                  className: "bg-green-200",
                  title: "AWS Developer Associate",
                  href: "https://www.credly.com/badges/fb17e291-5f18-4c0f-9474-364d82549bbe",
                },
                {
                  imageUrl:
                    "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg",
                  className: "bg-teal-400",
                  title: "Azure Cloud Fundamentals (AZ-900)",
                  href: "https://learn.microsoft.com/api/credentials/share/en-us/HanYoong-5994/47B43AF13DE84FB9?sharingId=FE2E719D4C5E0EFB",
                },
                {
                  imageUrl:
                    "https://d1.awsstatic.com/certification/badges/AWS-Certified-Cloud-Practitioner_badge_150x150.17da917fbddc5383838d9f8209d2030c8d99f31e.png",
                  className: "bg-teal-300",
                  title: "AWS Cloud Practitioner",
                  href: "https://www.credly.com/badges/b17e3872-c5c5-49f7-8c6a-186e107a28d2",
                },
                {
                  className: "bg-pink-200",
                  title: "Samurai Leadership",
                  description: <span>Samurai Leadership - Green Belt.</span>,
                  href: "/certs/samurai-leadership-yoong-han.pdf",
                },
                {
                  className: "bg-green-400",
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
                  className: "bg-green-300",
                  title: "Sun Java Certified",
                  description: <span>Certification on Java programmer.</span>,
                },
                {
                  className: "bg-green-200",
                  title: "Webassembly with RUST programming",
                  description: (
                    <span>
                      Rusty but worky on RUST programming with javascript.
                    </span>
                  ),
                },
                {
                  className: "bg-yellow-400",
                  title: "Kinabalu Park Explorer",
                  description: (
                    <span>
                      Completed 2 trails course to hike highest mountain in{" "}
                      {"Malaysia"}, Mount Kota Kinabalu.
                    </span>
                  ),
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
