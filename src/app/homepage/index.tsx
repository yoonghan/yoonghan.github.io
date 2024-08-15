import styles from "./Homepage.module.css"
import SocialFab from "@/components/SocialFab"
import ClientCookie from "@/components/ClientCookie"
import Link from "@/components/Link"
import Figure from "@/components/Figure"
import Button from "@/components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

function Homepage() {
  const walcronText = <strong>Walcron</strong>
  const quoteText = (text: string) => <>&quot;{text}&quot;</>

  return (
    <>
      <main className={`${styles.container} container mx-auto px-4`}>
        <article className="text-center">
          <h1 className="text-4xl pb-12">Welcome to {walcronText} website</h1>
          <p>
            This is a sandbox website for us to <strong>explore</strong>{" "}
            real-time Web Development.
          </p>

          <p>
            We&apos;re just a regular coder who are keen in{" "}
            <strong>Web and Cloud</strong> technologies.
          </p>
        </article>
        <hr />
        <article className="max-w-screen-md mx-auto">
          <h2 className="text-2xl text-center pb-12">
            What is truely important for {walcronText} development?
          </h2>
          <p>
            This site was up since <strong>2014</strong> and had many iterations
            [<Link href="/history">Learn More of our history</Link>] and have
            evolved from <strong>Pure Server Render</strong> to{" "}
            <strong>Non-Javascript Accessible</strong> site.
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
                <Link href="#monitor">Monitoring</Link>
              </li>
              <li>
                <Link href="#performance">Performance</Link>
              </li>
            </ul>
          </nav>
        </article>
        <hr />
        {/* Reliability */}
        <section>
          <h6 className="text-3xl text-center" id="reliability">
            Reliability
          </h6>
          <div className="text-center my-8">
            Being a self-maintained site, how do one...
            <ul className="text-lg italic pt-4">
              <li>{quoteText("Validate his own changes ?")}</li>
              <li>
                {quoteText("Ensure changes doesn&apos;t break anything ?")}
              </li>
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
                      <strong>Coverage</strong> - 99.9% lines of code covered.[
                      <Link href="https://app.codecov.io/gh/yoonghan/yoonghan.github.io">
                        CodeCov
                      </Link>
                      ]
                    </li>
                    <li>
                      <strong>Integration</strong> - API doesn&apos;t break. [
                      <Link href="https://github.com/yoonghan/yoonghan.github.io/actions/workflows/pull-request.yml">
                        Smoke and E2E
                      </Link>
                      ]
                    </li>
                    <li>
                      <strong>Layout verification</strong> - Workflow on User
                      Interface changes. [
                      <Link href="https://github.com/yoonghan/yoonghan.github.io/actions/runs/10380878898">
                        Snapshots
                      </Link>
                      ]
                    </li>
                    <li>
                      <strong>Compliance</strong> - Security and Lint checks. [
                      <Link href="https://github.com/yoonghan/yoonghan.github.io/actions/workflows/push.yml">
                        OWASP check
                      </Link>{" "}
                      and Dependabots]
                    </li>
                    <li>
                      <strong>Restriction</strong> - Deploys ONLY{" "}
                      <em className="text-emerald-500">ONLY successful</em>{" "}
                      pull-request.
                    </li>
                  </ul>
                </>
              </Figure>
            </section>
            <section className="max-w-screen-md mx-auto pt-8">
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
        </section>
        <hr />
        {/* Accessibility */}
        <section className="max-w-screen-md mx-auto" id="accessibility">
          <h6 className="text-3xl text-center" id="reliability">
            Accessibility and Readability
          </h6>
          <section>
            <div className="text-xl italic text-center">
              &quot;Our Homepage can now be browsed{" "}
              <strong className="text-2xl">WITHOUT JAVASCRIPT</strong>!!&quot;
            </div>
            <p className="pt-8">
              We did it by relying on both PureCSS, Server Side Generation and
              ensuring non-critical usage for Javascript. The old homepage was{" "}
              <Link href="/experiments/homepage-v1">Javascript heavy</Link>
              (Parallax Effect) and we encountered{" "}
              <span className="underline">performance</span> and{" "}
              <span className="underline">accessibility</span>
              issues.
            </p>
          </section>

          <section className="pt-8">
            <div className="text-xl italic text-center">
              This site can also be browsed with keyboard and text-readers.
            </div>
            <p className="pt-8">
              We are going now commited with this Web Accessibility; eventhough
              we are still in the learning phase. The best reliance is to run
              periodically test with{" "}
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
        </section>
        <hr />
        {/* Monitoring */}
        <section className="max-w-screen-md mx-auto" id="monitoring">
          <h6 className="text-3xl text-center" id="reliability">
            Monitoring
          </h6>
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
        </section>
        <hr />
        {/* Performance */}
        <section className="max-w-screen-md mx-auto" id="performance">
          <h6 className="text-3xl text-center" id="reliability">
            Performance
          </h6>
          <section>
            <p>
              We use Lighthouse and Google Page Speed to check on our webpage
              performance. Have yet to include Core Web Vitals.
            </p>
          </section>
        </section>
      </main>
      <SocialFab />
      <ClientCookie />
    </>
  )
}

export default Homepage
