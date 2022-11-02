import Banner from "@/components/Banner"
import CommandBar from "@/components/CommandBar"
import Cookie from "@/components/Cookie"
import Footer from "@/components/Footer"
import HtmlHead from "@/components/HtmlHead"
import LetterBox from "@/components/LetterBox"
import Image from "next/image"
import LogoText from "@/components/LogoText"
import PageReaderIndicator from "@/components/PageReaderIndicator"
import Parallax from "@/components/Parallax"
import ScrollIcon from "@/components/ScrollIcon"
import { getCookie, hasCookie } from "cookies-next"
import type { NextPageContext } from "next"
import { useRef } from "react"
import styles from "./index.module.css"
import Button from "@/components/Button"

interface Props {
  termsRead: boolean
}

function Home({ termsRead }: Props) {
  const scrollContainerRef = useRef(null)

  return (
    <div className="container">
      <HtmlHead
        title={"Walcron"}
        description={
          "Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes."
        }
      />

      <main className={styles.homepage}>
        <PageReaderIndicator scrollContainer={scrollContainerRef} />
        <div ref={scrollContainerRef} id="parallax-container">
          <CommandBar />
          <Parallax scrollContainer={scrollContainerRef}>
            <section id="introduction" className={styles.introduction}>
              <h1 className="title">
                Welcome to <LogoText /> Coorperation Website
              </h1>
              <article>
                <p>
                  We&apos;re just a normal coder and keen to explore. But I
                  guess it&apos;s fun to explain how his website/repo works.
                </p>
                <p>Our objective</p>
                <ul>
                  <li>Bringing latest Next.JS codes</li>
                  <li>100% code coverage website</li>
                  <li>Hello typescript</li>
                  <li>Bye-bye Internet Explorer</li>
                  <li>Bye-bye Modernizer</li>
                </ul>
                <ScrollIcon
                  scrollContainer={scrollContainerRef}
                  text="Scroll for more"
                />
              </article>
            </section>
            <section id="test driven development">
              <article>
                <h2 className="title">Test Driven Development</h2>
                <p>
                  Test are written before the implementation(¯\_(ツ)_/¯), but
                  due to the access of old components there were many written
                  test were carried out over the existing component.
                </p>
                <p>
                  Only 1 SNAPSHOT used for test is ever taken for{" "}
                  <strong>React</strong>! (yes it&apos;s for html header)
                </p>
                <p>
                  It&apos;s <i>100% code coverage</i> and it&apos;s normally
                  achieved immediately on new functions/class written.
                </p>
              </article>
              <div className={styles.snapshots}>
                <Image
                  src="/img/welcome/introduction-test-development-driven.webp"
                  alt="Written in Test Development Driven"
                  width={640}
                  height={400}
                />
              </div>
            </section>
            <section id="github-pull-request" className="colorme">
              <div className={styles.snapshots}>
                <Image
                  src="/img/welcome/introduction-pull-request.webp"
                  alt="Pull Request for Code merge"
                  width={640}
                  height={400}
                />
              </div>
              <article>
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
                  No direct &quot;master&quot; branch check-in. But it&apos;s
                  never disallowed for admin.
                </p>
                <p>
                  <i>Debatable:</i> May not be a fit to for Continous
                  Integration flow on branching, but fit for us.
                </p>
              </article>
            </section>
            <section id="github-workflow">
              <article>
                <h2 className="title">Github workflow</h2>
                <p>
                  During the pull-request, will automatically go thru the
                  intesive check of (in order):
                </p>
                <ol>
                  <li>Linting, Prettifier.</li>
                  <li>Type check build with NextJS.</li>
                  <li>Code test with coverage.</li>
                  <li>Publish code coverage for README tagging.</li>
                  <li>Validate previous vs latest User-Interface change.</li>
                </ol>
                <Button
                  href="https://github.com/yoonghan/Walcron/blob/master/.github/workflows/validator.yml"
                  text="View workflows code"
                  color="orange"
                ></Button>
              </article>
              <div className={styles.snapshots}>
                <Image
                  src="/img/welcome/introduction-build-workflow.webp"
                  alt="Use Github build workflow"
                  width={640}
                  height={400}
                />
              </div>
            </section>
            <section id="Vercel deployment" className="colorme">
              <div className={styles.snapshots}>
                <Image
                  src="/img/welcome/introduction-vercel-deployment.webp"
                  alt="Deployment in vercel"
                  width={640}
                  height={400}
                />
              </div>
              <article>
                <h2 className="title">
                  Vercel Deployment to testing environment
                </h2>
                <p>
                  A hook was created in vercel, and automatically build and
                  deployed into a staging environment on every new commit.
                </p>
              </article>
            </section>
            <section id="UI Validation">
              <article>
                <h2 className="title">User Interface check</h2>
                <p>
                  <strong>SAY NO</strong> to odd layout and displays to user
                  after deployment. We run this via Behaviour Driven
                  Development.
                </p>
                <ol>
                  <li>
                    Playwright script is written to capture different screen
                    with user predicting-behaviours.
                  </li>
                  <li>
                    An approved screen snapshot (not react-testing snapshot)
                    from previous deployment is always taken and is used to be
                    compared with the latest deployment.
                  </li>
                  <li>
                    A report will be generated via Github workflow to compare
                    the differences and if everything is approved, it has to be
                    updated and committed.
                  </li>
                </ol>
              </article>

              <div className={styles.snapshots}>
                <Image
                  src="/img/welcome/introduction-backstop-ui-check.webp"
                  alt="Check UI previous vs current"
                  width={640}
                  height={400}
                />
              </div>
            </section>
            <section id="Merging and Production Deployment">
              <div className={styles.snapshots}>
                <Image
                  src="/img/welcome/introduction-final-deployment.webp"
                  alt="Failed deployment that cannot be merged"
                  width={640}
                  height={400}
                />
              </div>
              <article>
                <h2 className="title">Go Live</h2>
                <p>
                  Only commits that passes the Github can be approved and
                  merged!
                </p>
              </article>
            </section>

            <section id="Contact us">
              <div className={`center ${styles.contactus}`}>
                <h2>Contact Us</h2>
                <div className="p-padding">
                  <LetterBox />
                </div>
              </div>
            </section>
          </Parallax>
        </div>
      </main>

      <Cookie isClosed={termsRead} cookieName={"termsRead"} />
      <Footer className={"footer"} />
    </div>
  )
}

export async function getServerSideProps({ req, res }: NextPageContext) {
  return {
    props: {
      termsRead: hasCookie("termsRead", { req, res })
        ? getCookie("termsRead", { req, res })
        : false,
    },
  }
}

export default Home
