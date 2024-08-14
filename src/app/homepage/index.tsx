import styles from "./Homepage.module.css"
import SocialFab from "@/components/SocialFab"
import ClientCookie from "@/components/ClientCookie"
import Link from "@/components/Link"
import Figure from "@/components/Figure"

function Homepage() {
  const walcronText = <strong>Walcron</strong>

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

          <p>
            This site to <strong>records</strong> our development and things we
            learn.
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
            In summary as of <strong>2024</strong>, the importance of{" "}
            {walcronText} website are:
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
        <section>
          <h6 className="text-3xl text-center" id="reliability">
            Reliability
          </h6>
          <div className="text-center my-8">
            Being a self-maintained site, how do one...
            <ul className="text-lg italic pt-4">
              <li>&quot;Validate his own changes ?&quot;</li>
              <li>&quot;Ensure changes doesn&apos;t break anything ?&quot;</li>
              <li>&quot;How to do frequent deployment ?&quot;</li>
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
                  to do our biddings. To do our continous integration and
                  deployment (CI/CD):
                  <ul className="mt-4 ml-4 list-disc">
                    <li>
                      <strong>Testing</strong> - nothing breaks with new
                      changes. [
                      <Link href="https://github.com/yoonghan/yoonghan.github.io/actions/workflows/push.yml?query=workflow%3A">
                        GitHub Actions
                      </Link>
                      ]
                    </li>
                    <li>
                      <strong>Coverage</strong> - not slacking at 99.9%
                      coverage.[
                      <Link href="https://app.codecov.io/gh/yoonghan/yoonghan.github.io">
                        Tracked In CodeCov
                      </Link>
                      ]
                    </li>
                    <li>
                      <strong>Integration</strong> - api with external party
                      always worked. [
                      <Link href="https://github.com/yoonghan/yoonghan.github.io/actions/workflows/pull-request.yml">
                        Smoke test and E2E test
                      </Link>
                      ]
                    </li>
                    <li>
                      <strong>Layout verification</strong> - workflow to approve
                      User Interface changes. [
                      <Link href="https://github.com/yoonghan/yoonghan.github.io/actions/runs/10380878898">
                        Snapshots
                      </Link>
                      ]
                    </li>
                    <li>
                      <strong>Compliance</strong> - Security and coding
                      standards. [
                      <Link href="https://github.com/yoonghan/yoonghan.github.io/actions/workflows/push.yml">
                        Owasp check
                      </Link>{" "}
                      and Dependabots]
                    </li>
                    <li>
                      <strong>Restriction</strong> - Master deployment branch is
                      protected and allow only{" "}
                      <em className="text-emerald-500">
                        successful pull-request
                      </em>{" "}
                      to deploy.
                    </li>
                  </ul>
                </>
              </Figure>
            </section>
            <section className="max-w-screen-md mx-auto pt-8">
              <div className="text-center text-lg mb-12 italic">
                &quot;So what if something really breaks ?&quot;
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
                    <strong>LOL!</strong> In reality this will happen. There are
                    fallbacks options to this:
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
                        , but will not work for GitHub Pages.
                      </li>
                    </ul>
                  </>
                </Figure>
              </section>
            </section>
          </section>
        </section>
      </main>
      <SocialFab />
      <ClientCookie />
    </>
  )
}

export default Homepage
