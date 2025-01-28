import styles from "./Homepage.module.css"
import SocialFab from "@/components/SocialFab"
import Link from "@/components/Link"
import Figure from "@/components/Figure"
import Button from "@/components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRight,
  faCertificate,
  faKeyboard,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import LetterBox from "@/components/LetterBox"
import Lifecycle from "@/components/Lifecycle"
import Wave from "@/components/Animate/Wave"
import Workflow from "@/components/Animate/Workflow"
import FontAwesomeAnimate from "@/components/Animate/FontAwesomeAnimate"
import Gauge from "@/components/Animate/Gauge"

function Homepage() {
  const walcronText = "Walcron"

  return (
    <>
      <div
        className={`${styles.header} m-auto flex justify-between gap-12 p-16 flex-col-reverse md:py-0 md:flex-row items-center max-w-screen-xl`}
      >
        <Image
          src="/img/welcome/girl-in-glass.webp"
          width={378}
          height={504}
          alt="Gladys"
          className={styles.clip}
        ></Image>
        <div>
          <h1>A PORTFOLIO WEBSITE</h1>
          <div className="text-md py-8 comment">
            Walcron website is a self-maintained and serverless website.
          </div>
          <Button href="/about">About us</Button>
        </div>
      </div>
      <hr />
      <div
        className={`${styles.container} container mx-auto px-4 max-w-screen-lg`}
      >
        <article className="text-center">
          <h2 className="text-3xl pb-12">Website Development</h2>
          <p className="text-justify">
            This site was up since <strong>2014</strong> and had since went thru
            many web change iterations [
            <Link href="/history">Site History</Link>]. We had evolved the site
            from <strong>AJAX/SPA</strong> to{" "}
            <strong>Pure Server Render</strong> to a now
            <strong> Non-Javascript Accessible</strong> site. The objective is
            to have a site that is <em>DevOps</em> oriented development in{" "}
            <em>Cloud</em> platform.{" "}
            {
              'This site is to showcase our work and a playbox for real-time testing. As of the mantra, we always do "monitored reliable releases".'
            }
          </p>
          <div className="flex justify-center flex-col items-center">
            <Lifecycle
              models={[
                {
                  url: "#performance",
                  label: "Performance",
                },
                {
                  url: "#reliability",
                  label: "Reliable Deployment",
                },
                {
                  url: "#accessibility",
                  label: "Accessibility (WCAG)",
                },
                {
                  url: "#monitoring",
                  label: "Monitoring",
                },
              ]}
            />
            <span className="italic text-md">Site Development Lifecycle</span>
          </div>
        </article>
        <hr />
        {/* Reliability */}
        <article>
          <h3 className="text-3xl text-center" id="reliability">
            Reliable Deployment
          </h3>
          <Workflow className="gap-8" title="Deployment Cog">
            <div className="text-center my-8">
              Being a self-maintained site, how do one...
              <ul className="text-lg italic pt-4">
                <li>{`"Validate his own changes ?"`}</li>
                <li>{`"Ensure changes doesn't break anything ?"`}</li>
                <li>{`"A hassle to deploy changes ?"`}</li>
              </ul>
            </div>
          </Workflow>
          <div className="max-w-screen-md mx-auto">
            <div className="pt-8">
              <Figure
                imageProps={{
                  src: "/img/homepage/reliability-workflow.webp",
                  width: 500,
                  height: 1200,
                  alt: "Github workflows",
                }}
                imageCaption="Github workflow from Testing to Deployment"
              >
                <>
                  In {walcronText} we implement{" "}
                  <Link href="https://docs.github.com/en/actions/writing-workflows">
                    GitHub workflow
                  </Link>{" "}
                  to do our biddings. A full CI/CD:
                  <ul className="mt-4 ml-4 list-disc">
                    <li>
                      <strong>Testing</strong> - ensure safety in modification.
                      [
                      <Link href="https://github.com/yoonghan/yoonghan.github.io/actions/workflows/push.yml?query=workflow%3A">
                        GitHub Actions
                      </Link>
                      ]
                    </li>
                    <li>
                      <strong>Integration</strong> - {"API doesn't break"}. [
                      <Link href="https://github.com/yoonghan/yoonghan.github.io/actions/workflows/pull-request.yml">
                        Smoke and E2E
                      </Link>
                      ]
                    </li>
                    <li>
                      <strong>Release</strong> - Deploys{" "}
                      <em className="text-green-700">ONLY successful</em>{" "}
                      pull-request.
                    </li>
                  </ul>
                </>
              </Figure>
            </div>
            <div className="pt-24">
              <Figure
                imageProps={{
                  src: "/img/homepage/reliability-approval.webp",
                  width: 1024,
                  height: 515,
                  alt: "Comparing latest image",
                }}
                imageCaption="Detects before and after User Interface changes"
                reversed={true}
              >
                <>
                  User Interface verification:
                  <ul className="mt-4 ml-4 list-disc">
                    <li>
                      <strong>Layout verification</strong> - Production layout
                      are compared with preview. [
                      <Link href="https://github.com/yoonghan/yoonghan.github.io/actions/runs/10380878898">
                        Snapshots
                      </Link>
                      ]
                    </li>
                    <li>
                      <strong>Approval workflow</strong> - Integrated approval
                      process. [
                      <Link href="https://github.com/yoonghan/yoonghan.github.io/actions/runs/10462109042">
                        Snapshots
                      </Link>
                      ]
                    </li>
                  </ul>
                </>
              </Figure>
            </div>
            <div className="pt-24">
              <Figure
                imageProps={{
                  src: "/img/homepage/reliability-compliance.webp",
                  width: 1024,
                  height: 515,
                  alt: "Code coverage screenshot",
                }}
                imageCaption="Code coverage in CodeCov"
              >
                <>
                  We up-keep coding standards and security compliance:
                  <ul className="mt-4 ml-4 list-disc">
                    <li>
                      <strong>Coverage</strong> - 99.9% lines of code covered.[
                      <Link href="https://app.codecov.io/gh/yoonghan/yoonghan.github.io">
                        CodeCov
                      </Link>
                      ]
                    </li>
                    <li>
                      <strong>Linting</strong> - Coding checks to ensure proper
                      coding styles.
                    </li>
                    <li>
                      <strong>Compliance</strong> - Security and Lint checks. [
                      <Link href="https://github.com/yoonghan/yoonghan.github.io/actions/workflows/push.yml">
                        OWASP check
                      </Link>{" "}
                      and Dependabots]
                    </li>
                    <li>
                      <strong>Accessibility</strong> - Integrated lighthouse to
                      keep best-practises and accessibility at 100%.
                    </li>
                  </ul>
                </>
              </Figure>
            </div>
            <div className="max-w-screen-md mx-auto pt-24">
              <div className="text-center text-lg mb-12 italic">
                {`"So what if something really breaks ?"`}
              </div>
              <Figure
                imageProps={{
                  src: "/img/homepage/reliability-revert.webp",
                  height: 500,
                  width: 345,
                  alt: "Github workflows",
                }}
                imageCaption="Checkout Tag and Redeploy"
                reversed={true}
              >
                <>
                  Face it, this happens with new experimentations. The workflow
                  is built to handles fallback options:
                  <ul className="list-decimal ml-4 mt-4">
                    <li>
                      Re-run the release tag in action workflow. Every
                      pull-request is tracked via Release [
                      <Link href="https://github.com/yoonghan/yoonghan.github.io/releases">
                        list of releases
                      </Link>
                      ] during merge workflow.
                    </li>
                    <li>
                      Revert via <Link href="https://vercel.com">Vercel</Link>,
                      but not applicable to GitHub Pages. Useful for API break
                      changes.
                    </li>
                    <li>A guaranteed revert process is less than 10minutes.</li>
                  </ul>
                </>
              </Figure>
            </div>
          </div>
        </article>
        <hr />
        {/* Accessibility */}
        <article>
          <h4 className="text-3xl text-center font-bold" id="accessibility">
            Accessibility (WCAG)
          </h4>
          <FontAwesomeAnimate
            title={"Universal Accessible"}
            className="flex items-center justify-center py-8 gap-4"
            faIcon={faUniversalAccess}
            animate="shake"
          >
            Our Homepage be browsed WITHOUT Javascript enabled!
          </FontAwesomeAnimate>
          <p>
            We did it by relying on both PureCSS, Server Side Generation and
            ensuring non-critical usage for Javascript. The old homepage was{" "}
            <Link href="/experiments/homepage-v1">Javascript heavy</Link>
            (Parallax Effect) and we encountered <strong>
              performance
            </strong>{" "}
            and <strong>accessibility </strong>
            issues.
          </p>
          <FontAwesomeAnimate
            title={"Keyboard Accessible"}
            className="flex items-center justify-center py-8 gap-4"
            faIcon={faKeyboard}
            animate="bounce"
          >
            This site can also be browsed with keyboard and text-readers.
          </FontAwesomeAnimate>
          <p className="pt-8">
            We are going now commited with <strong>Web Accessibility</strong>;
            eventhough we are still in the learning phase. The best reliance is
            to run periodically test with{" "}
            <Link
              href="https://www.accessibilitychecker.org/audit/?website=www.walcron.com&flag=us"
              rel="external"
              target="audit"
            >
              Accessibility Checker
            </Link>{" "}
            and Chrome built-in Lighthouse.
          </p>
          <FontAwesomeAnimate
            title={"Trusted Web App"}
            className="flex items-center justify-center py-8 gap-4"
            faIcon={faCertificate}
            animate="spin"
            color="red"
          >
            The site is Trusted Web Activity(TWA) and Progressive(PWA)
            compatible.
          </FontAwesomeAnimate>
          <figure>
            <Image
              src="/img/homepage/app-compatible.webp"
              width={800}
              height={388}
              alt="Trusted Web Activity"
              className="mx-auto"
            />
            <Image
              src="/img/arrow.svg"
              className="hidden md:block w-4 -my-1 relative z-10 mx-auto ml-[55%] border-0"
              aria-hidden={true}
              alt="Description arrow"
              width={50}
              height={100}
            />
            <figcaption>
              Access from the search panel and type <em>{'"pwa"'}</em>, once
              installed you can view our site anytime, anywhere with or without
              network.
            </figcaption>
          </figure>
        </article>
        <hr />
        {/* Monitoring */}
        <article>
          <h5 className="text-3xl text-center font-bold" id="monitoring">
            Monitoring
          </h5>
          <Wave
            className="text-xl italic text-center pt-8"
            title="monitoring wave"
          >
            {`"Dogfooding. We eat our own dogfood!"`}
          </Wave>
          <div className="max-w-screen-md  mx-auto pt-16">
            <Figure
              imageProps={{
                src: "/img/homepage/monitoring-opentelemetry.webp",
                height: 1024,
                width: 542,
                alt: "Axiom Telemetry dashboard",
              }}
              imageCaption="Leverage Axiom's Open Telemetry to view API workflow"
            >
              <>
                We use Axiom to stream OpenTelemetry data over. Using this data
                we can monitor our API&apos;s performance and application
                integration.
              </>
              <div className="flex justify-center pt-10">
                <Button href="/projects/checklist">
                  View Checklists
                  <FontAwesomeIcon icon={faArrowRight} className="pl-2" />
                </Button>
              </div>
            </Figure>
            <div className="pt-24">
              <Figure
                imageProps={{
                  src: "/img/homepage/monitoring-website.webp",
                  height: 1024,
                  width: 664,
                  alt: "Checkly dashboard",
                }}
                imageCaption="Checkly is used to monitor our website up-time."
                reversed={true}
              >
                <p>
                  An alarm system if the website is ever down within 24hours. A
                  dashboard is created as well to check on performance and
                  region latency.
                </p>
              </Figure>
            </div>
          </div>
        </article>
        <hr />
        {/* Performance */}
        <article>
          <h6 className="text-3xl text-center font-bold" id="performance">
            Performance
          </h6>
          <Gauge
            title="Performance Gauge"
            className="text-xl italic text-center pt-8 flex flex-col items-center"
          >{`"Maintaining standards with low latency."`}</Gauge>
          <div className="max-w-screen-md  mx-auto pt-16">
            <Figure
              imageProps={{
                src: "/img/homepage/performance.webp",
                height: 1024,
                width: 689,
                alt: "Speed Insight",
              }}
              imageCaption="Google Speed Insight"
            >
              We maintain a good performance and accessibility. We use
              Lighthouse to monitored during deployment.
            </Figure>
            <div className="pt-24">
              <Figure
                imageProps={{
                  src: "/img/homepage/performance-gcp.webp",
                  height: 1024,
                  width: 722,
                  alt: "Google Big Data Query",
                }}
                imageCaption="We page loading data with Google Analytics."
                reversed={true}
              >
                We occasionally monitor our websites loading performances so
                that we can keep our rating high for SEO. We also collect
                client&apos; data ONLY if consensus is given; so...please{" "}
                <strong>accept</strong> the cookie. :)
              </Figure>
            </div>
          </div>
        </article>
        <hr />
        <div className="py-8">
          <LetterBox />
        </div>
      </div>
      <SocialFab />
    </>
  )
}

export default Homepage
