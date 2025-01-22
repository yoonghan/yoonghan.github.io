import styles from "./Homepage.module.css"
import SocialFab from "@/components/SocialFab"
import Link from "@/components/Link"
import Figure from "@/components/Figure"
import Button from "@/components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import LetterBox from "@/components/LetterBox"
import Lifecycle from "@/components/Lifecycle"

function Homepage() {
  const walcronText = "Walcron"

  return (
    <>
      <div
        className={`${styles.container} container mx-auto px-4 max-w-screen-lg`}
      >
        <article className="text-center max-w-md">
          <h1 className="text-4xl pb-12">Welcome to {walcronText} website</h1>
          <p>
            This is a sandbox website for the two of us to{" "}
            <strong>explore</strong> real-time Web Development.
          </p>
          <p>
            We do sometimes use the site to by-pass coorporate networks for
            private communication.
          </p>
          <figure>
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
              className="hidden md:block w-4 -my-3 relative z-10 mx-auto ml-[55%] border-0"
              aria-hidden={true}
              alt="Description arrow"
              width={50}
              height={100}
            />
            <figcaption className="italic">Us in Portugal</figcaption>
          </figure>
        </article>
        <hr />
        <article>
          <h2 className="text-2xl text-center pb-12">
            What is truely important for {walcronText} development?
          </h2>
          <p>
            This site was up since <strong>2014</strong> and had went thru many
            iterations [<Link href="/history">Learn More of our history</Link>];
            evolved from <strong>AJAX/SPA</strong> to{" "}
            <strong>Pure Server Render</strong> to
            <strong> Non-Javascript Accessible</strong> site. Our main goal now
            are <em>DevOps oriented.</em>
          </p>
          <div className="flex justify-center">
            <Lifecycle
              models={[
                {
                  url: "#reliability",
                  label: "Reliability",
                },
                {
                  url: "#accessibility",
                  label: "Accessibility (WCAG)",
                },
                {
                  url: "#monitoring",
                  label: "Monitoring",
                },
                {
                  url: "#performance",
                  label: "Performance",
                },
              ]}
            />
          </div>
        </article>
        <hr />
        {/* Reliability */}
        <article>
          <h3 className="text-3xl text-center" id="reliability">
            Reliability
          </h3>
          <div className="text-center my-8">
            Being a self-maintained site, how do one...
            <ul className="text-lg italic pt-4">
              <li>{`"Validate his own changes ?"`}</li>
              <li>{`"Ensure changes doesn't break anything ?"`}</li>
              <li>{`"A hassle to deploy changes ?"`}</li>
            </ul>
          </div>
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
            <div className="pt-32">
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
            <div className="pt-32">
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
            <div className="max-w-screen-md mx-auto pt-32">
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
          <div>
            <div className="text-xl italic text-center">
              &quot;Our Homepage can now be browsed WITHOUT JAVASCRIPT!!&quot;
            </div>
            <p className="pt-8">
              We did it by relying on both PureCSS, Server Side Generation and
              ensuring non-critical usage for Javascript. The old homepage was{" "}
              <Link href="/experiments/homepage-v1">Javascript heavy</Link>
              (Parallax Effect) and we encountered <strong>
                performance
              </strong>{" "}
              and <strong>accessibility </strong>
              issues.
            </p>
          </div>
          <div className="pt-8">
            <div className="text-xl italic text-center">
              This site can also be browsed with keyboard and text-readers.
            </div>
            <p className="pt-8">
              We are going now commited with <strong>Web Accessibility</strong>;
              eventhough we are still in the learning phase. The best reliance
              is to run periodically test with{" "}
              <Link
                href="https://www.accessibilitychecker.org/audit/?website=www.walcron.com&flag=us"
                rel="external"
                target="audit"
              >
                Accessibility Checker
              </Link>{" "}
              and Chrome built-in Lighthouse.
            </p>
          </div>
          <div className="pt-8">
            <div className="text-xl italic text-center pb-8">
              The site is Trusted Web Activity(TWA) and Progressive(PWA)
              compatible.
            </div>
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
                installed you can view our site anytime, anywhere with or
                without network.
              </figcaption>
            </figure>
          </div>
        </article>
        <hr />
        {/* Monitoring */}
        <article>
          <h5 className="text-3xl text-center font-bold" id="monitoring">
            Monitoring
          </h5>
          <div className="text-xl italic text-center pt-8">
            {`"Dogfooding. We eat our own dogfood!"`}
          </div>
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
            <div className="pt-32">
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
          <div className="text-xl italic text-center pt-8">
            {`"Keeping standards and low latency."`}
          </div>
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
            <div className="pt-32">
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
