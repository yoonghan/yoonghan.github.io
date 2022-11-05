import CommandBar from "@/components/CommandBar"
import Footer from "@/components/Footer"
import HtmlHead from "@/components/HtmlHead"
import LetterBox from "@/components/LetterBox"
import Image from "next/image"
import LogoText from "@/components/LogoText"
import PageReaderIndicator from "@/components/PageReaderIndicator"
import Parallax, { ScrollHandler } from "@/components/Parallax"
import ScrollIcon from "@/components/ScrollIcon"
import { useRef, useMemo, useEffect, useState } from "react"
import styles from "./Homepage.module.css"
import Button from "@/components/Button"
import SocialFab from "@/components/SocialFab"
import Navigator from "@/components/Navigator"
import Cookie from "@/components/Cookie"
import { links } from "./links"

interface Props {
  termsRead: boolean
}

function Home({ termsRead }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollHandlerRef = useRef<ScrollHandler>(null)

  const sections = useMemo(
    () => [
      <section key="introduction" className={styles.introduction}>
        <h1 className="title">
          Welcome to <LogoText /> Coorperation
        </h1>
        <div className={styles.info}>
          <Navigator
            label={"Site Navigation"}
            links={links}
            onLinkClick={(link: string) =>
              scrollHandlerRef?.current?.scroll(Number(link))
            }
          />
          <article>
            <div>
              <h3>
                This is a sandbox website for us to explore Web Development.
                <br />
                <br />
                We&apos;re just a normal coder and keen to explore.
                <br />
                But I guess it&apos;s nice show{" "}
                <i>&quot;How we built this website&quot;</i>
              </h3>
              <div className={styles.show}>
                <div>LET US SHOW YOU</div>
                <div>HOW THIS SITE IS BUILT</div>
              </div>
            </div>
            <ScrollIcon
              scrollContainer={scrollContainerRef}
              text="Scroll for more"
            />
          </article>
        </div>
      </section>,
      <section key="tdd">
        <article>
          <h2 className="title">Test Driven Development</h2>
          <p>
            Test are written before the implementation(¯\_(ツ)_/¯), but due to
            the access of old components there were many written test were
            carried out over the existing component.
          </p>
          <p>
            Only 1 SNAPSHOT used for test is ever taken for{" "}
            <strong>React</strong>! (yes it&apos;s for html header)
          </p>
          <p>
            It&apos;s <i>100% code coverage</i> and it&apos;s normally achieved
            immediately on new functions/class written.
          </p>
          <Button
            href="//github.com/yoonghan/Walcron/blob/master/README.md"
            target="_workflow"
            text="View Test Coverage"
            color="orange"
          ></Button>
        </article>
        <div className={styles.snapshots}>
          <Image
            src="/img/welcome/introduction-test-development-driven.webp"
            alt="Written in Test Development Driven"
            width={640}
            height={400}
          />
        </div>
      </section>,
      <section key="pull-request">
        <div className={styles.snapshots}>
          <Image
            src="/img/welcome/introduction-pull-request.webp"
            alt="Pull Request for Code merge"
            width={640}
            height={400}
          />
        </div>
        <article>
          <h2 className="title">Github Pull Request</h2>
          <p>
            All new commits{" "}
            <strong>
              <span className="strikethrough">MUST</span> HAVE
            </strong>{" "}
            to go thru a &quot;pull request&quot; -&gt; &quot;100%
            validated&quot;
          </p>
          <p>
            No direct &quot;master&quot; branch check-in. But it&apos;s never
            disallowed for admin.
          </p>
          <p>
            <i>Debatable:</i> May not be a fit to for Continous Integration flow
            on branching, but fit for us.
          </p>
          <Button
            href="//github.com/yoonghan/Walcron/pull/45"
            target="_workflow"
            text="View Merged Request"
            color="orange"
          ></Button>
        </article>
      </section>,
      <section key="workflow">
        <article>
          <h2 className="title">Github Workflow</h2>
          <p>
            During the pull-request, will automatically go thru the intesive
            check of (in order):
          </p>
          <ol>
            <li>Linting, Prettifier.</li>
            <li>Type check build with NextJS.</li>
            <li>Code test with coverage.</li>
            <li>Publish code coverage for README tagging.</li>
            <li>Validate previous vs latest User-Interface change.</li>
          </ol>
          <Button
            href="//github.com/yoonghan/Walcron/blob/master/.github/workflows/validator.yml"
            target="_workflow"
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
      </section>,
      <section key="snapshot">
        <div className={styles.snapshots}>
          <Image
            src="/img/welcome/introduction-vercel-deployment.webp"
            alt="Website Deployment"
            width={640}
            height={400}
          />
        </div>
        <article>
          <h2 className="title">Testing Deployment</h2>
          <p>
            A hook was created in vercel, and it automatically builds and
            deploys a <strong>development</strong> environment on every new
            commit.
          </p>
        </article>
      </section>,
      <section key="user interface">
        <article>
          <h2 className="title">UI/UX Validation</h2>
          <p>A better alternative than code Snapshot sampling.</p>
          <ol>
            <li>
              Playwright script is written to capture different mobile and
              desktop layouts with different simulated user interactions.
            </li>
            <li>
              A report will be generated to compare against the previous version
              layout, it will then run thru a workflow to get it approved.
            </li>
          </ol>
          <Button
            href="//github.com/yoonghan/Walcron/actions/workflows/snapshot.yml"
            target="_workflow"
            text="Generate One"
          />
        </article>
        <div className={styles.snapshots}>
          <Image
            src="/img/welcome/introduction-backstop-ui-check.webp"
            alt="Check UI previous vs current"
            width={640}
            height={400}
          />
        </div>
      </section>,
      <section key="deployment">
        <div className={styles.snapshots}>
          <Image
            src="/img/welcome/introduction-final-deployment.webp"
            alt="Failed deployment that cannot be merged"
            width={640}
            height={400}
          />
        </div>
        <article>
          <h2 className="title">Going Live</h2>
          <p>Only commits that passes the Github can be approved and merged!</p>

          <p>Once live, it goes to https://www.walcron.com</p>
        </article>
      </section>,
      <section key="contact us">
        <div className={`center ${styles.contactus}`}>
          <h2>Contact Us</h2>
          <div className="p-padding">
            <LetterBox />
          </div>

          <div className="section-end">
            <h6>
              This website is powered with: Next.JS with Typescript on Vercel
            </h6>
          </div>
        </div>
      </section>,
    ],
    []
  )

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
          <Parallax scrollContainer={scrollContainerRef} ref={scrollHandlerRef}>
            {sections}
          </Parallax>
        </div>
        <SocialFab />
      </main>
      <Cookie isClosed={termsRead} cookieName={"termsRead"} />
      <Footer className={"footer"} />
    </div>
  )
}

export default Home
