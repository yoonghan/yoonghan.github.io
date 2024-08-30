import styles from "./Homepage.module.css"
import SocialFab from "@/components/SocialFab"
import Link from "@/components/Link"
import Figure from "@/components/Figure"
import Button from "@/components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"

function Homepage() {
  const walcronText = <strong>Walcron</strong>
  const quoteText = (text: string) => <>&quot;{text}&quot;</>

  return (
    <>
      <main className={`${styles.container} container mx-auto px-4`}>
        <article className="text-center max-w-md mx-auto">
          <h1 className="text-4xl pb-12">Welcome to {walcronText} website</h1>
          <p>
            This is a sandbox website for us to <strong>explore</strong>{" "}
            real-time Web Development.
          </p>
          <p>
            This sandbox is for real-time testing for web environment and
            ofcourse to sometimes by-pass coorporate networks for private
            communication.
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
        <article className="max-w-screen-md mx-auto">
          <h2 className="text-2xl text-center pb-12">
            What is truely important for {walcronText} development?
          </h2>
          <p>
            This site was up since <strong>2014</strong> and had many iterations
            [<Link href="/history">Learn More of our history</Link>] and have
            evolved from <strong>Pure Server Render</strong> to
            <strong> Non-Javascript Accessible</strong> site.
          </p>
          <p>
            As of <strong>2024</strong>, the importance of {walcronText} website
            are:
          </p>
          <nav>
            <ul className="text-left -mt-6 ml-4 list-decimal">
              <li>
                <Link href="#reliability">Reliability</Link>
              </li>
              <li>
                <Link href="#accessibility">
                  Accessibility and Readability (WCAG)
                </Link>
              </li>
              <li>
                <Link href="#monitoring">Monitoring</Link>
              </li>
              <li>
                <Link href="#performance">Performance</Link>
              </li>
            </ul>
          </nav>
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
              <li>{quoteText("Validate his own changes ?")}</li>
              <li>{quoteText("Ensure changes doesn't break anything ?")}</li>
              <li>{quoteText("A hassle to deploy changes ?")}</li>
            </ul>
          </div>
          <section className="max-w-screen-md mx-auto">
            <section className="pt-8">
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
            </section>
            <section className="pt-32">
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
            </section>
            <section className="pt-32">
              <Figure
                imageProps={{
                  src: "/img/homepage/reliability-compliance.webp",
                  width: 1024,
                  height: 515,
                  alt: "Code coverage",
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
                  </ul>
                </>
              </Figure>
            </section>
            <section className="max-w-screen-md mx-auto pt-16">
              <div className="text-center text-lg mb-12 italic">
                {quoteText("So what if something really breaks ?")}
              </div>
              <section>
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
                    In reality this will happen, and there are fallbacks options
                    :
                    <ul className="list-decimal ml-4 mt-4">
                      <li>
                        Every pull-request is tracked via Release [
                        <Link href="https://github.com/yoonghan/yoonghan.github.io/releases">
                          list of releases
                        </Link>
                        ] . Checkout the release tag and create a new
                        pull-request.
                      </li>
                      <li>
                        Revert via <Link href="https://vercel.com">Vercel</Link>
                        , but not applicable to GitHub Pages. Useful for API
                        break changes.
                      </li>
                    </ul>
                  </>
                </Figure>
              </section>
            </section>
          </section>
        </article>
        <hr />
        {/* Accessibility */}
        <article className="max-w-screen-md mx-auto">
          <h4 className="text-3xl text-center" id="accessibility">
            Accessibility and Readability (WCAG)
          </h4>
          <section>
            <div className="text-xl italic text-center">
              &quot;Our Homepage can now be browsed{" "}
              <strong className="text-2xl">WITHOUT JAVASCRIPT</strong>!!&quot;
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
          </section>
          <section className="pt-8">
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
          </section>
          <section className="pt-8">
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
          </section>
        </article>
        <hr />
        {/* Monitoring */}
        <article className="max-w-screen-md mx-auto">
          <h5 className="text-3xl text-center" id="monitoring">
            Monitoring
          </h5>
          <div className="text-xl italic text-center pt-8">
            {quoteText("Ensure what we develop are standard.")}
          </div>
          <section>
            <p>
              As a self-maintained website, it is hard to know what is right. So
              we start to use tools, such as <strong>Google Analytics</strong>{" "}
              and <strong>Google Search Console</strong> to check on general
              usage to up-keep the standard guidelines.
            </p>
            <div className="flex justify-center">
              <Button href="/projects/checklist">
                View Checklists
                <FontAwesomeIcon icon={faArrowRight} className="pl-2" />
              </Button>
            </div>
          </section>
        </article>
        <hr />
        {/* Performance */}
        <article className="max-w-screen-md mx-auto">
          <h6 className="text-3xl text-center" id="performance">
            Performance
          </h6>
          <section>
            <figure>
              <Image
                src="/img/homepage/performance.webp"
                width={1024}
                height={689}
                alt="Google Page Speed"
                className="mx-auto mb-8"
              />
              <figcaption>
                <p>
                  We use Lighthouse and Google Page Speed to check on our
                  webpage performance. The ultimate goal is to test frequently
                  and keep the page simple.
                </p>
              </figcaption>
            </figure>
          </section>
        </article>
        <div className="pb-16"></div>
      </main>
      <SocialFab />
    </>
  )
}

export default Homepage
