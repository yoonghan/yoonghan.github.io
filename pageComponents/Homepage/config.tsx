import Button from "@/components/Button"
import LogoText from "@/components/LogoText"
import ScrollIcon from "@/components/ScrollIcon"
import Video from "@/components/Video"
import Image from "next/image"
import Navigator from "@/components/Navigator"
import { RefObject } from "react"
import { ScrollHandler } from "@/components/Parallax"
import styles from ""

export const siteDevelopmentSections = [
  {
    id: "1",
    title: "Test Driven Development",
    desc: (
      <>
        <p>
          Test are written before the implementation(¯\_(ツ)_/¯). Old components
          were written with new testcases for full code coverage.
        </p>
        <p>
          Only 1 SNAPSHOT test were ever taken for <strong>React</strong>! (yes
          it&apos;s for html header)
        </p>
        <p>
          It&apos;s an end-to-end <i>100% code coverage</i>.
        </p>
      </>
    ),
    link: {
      label: "View Test Coverage",
      src: "//github.com/yoonghan/Walcron/blob/master/README.md",
    },
    img: "/img/welcome/introduction-test-development-driven.webp",
  },
  {
    id: "2",
    title: "Github Pull Request",
    desc: (
      <>
        <p>
          All new commits{" "}
          <strong>
            <span className="strikethrough">MUST</span> HAVE
          </strong>{" "}
          to go thru a &quot;pull request&quot; -&gt; &quot;100% validated&quot;
        </p>
        <p>
          New commits have only 2 branches, master and develop to fit in{" "}
          <strong>Continous Integration</strong> methodology.
        </p>
      </>
    ),
    link: {
      label: "View Merged Request",
      src: "//github.com/yoonghan/Walcron/pull/45",
    },
    img: "/img/welcome/introduction-pull-request.webp",
  },
  {
    id: "3",
    title: "Github Workflow",
    desc: (
      <>
        <p>
          During the pull-request, an automatically is carried out in order:
        </p>
        <ol>
          <li>Linting, Prettifier.</li>
          <li>Type check build with NextJS.</li>
          <li>Code test with coverage.</li>
          <li>Publish code coverage for README tagging.</li>
          <li>Validate previous vs latest User-Interface change.</li>
        </ol>
      </>
    ),
    link: {
      label: "View Workflow Def.",
      src: "//github.com/yoonghan/Walcron/blob/master/.github/workflows/validator.yml",
    },
    img: "/img/welcome/introduction-build-workflow.webp",
  },
  {
    id: "4",
    title: "Testing Deployment",
    desc: (
      <p>
        A hook was created in vercel, and it automatically builds and deploy a{" "}
        <strong>development</strong> environment version for every new commit.
      </p>
    ),
    img: "/img/welcome/introduction-vercel-deployment.webp",
  },
  {
    id: "5",
    title: "UI/UX Validation",
    desc: (
      <>
        <p>A better alternative than code Snapshot sampling.</p>
        <ol>
          <li>
            Playwright script is written to capture different mobile and desktop
            layouts with different simulated user interactions.
          </li>
          <li>
            A report will be generated to compare against the previous version
            layout, it will then run thru an approval workflow.
          </li>
        </ol>
      </>
    ),
    link: {
      label: "Generate Adhoc Snapshot",
      src: "//github.com/yoonghan/Walcron/actions/workflows/snapshot.yml",
    },
    img: "/img/welcome/introduction-backstop-ui-check.webp",
  },
  {
    id: "6",
    title: "Going Live",
    desc: (
      <>
        <p>Only commits that passes all checks can be approved and merged!</p>
        <p>
          Once merged, it&apos;s automatically pushes to master and publishes to
          https://www.walcron.com
        </p>
      </>
    ),
    img: "/img/welcome/introduction-final-deployment.webp",
  },
  {
    id: "7",
    title: "Video About Us",
    desc: <></>,
    skip: true,
  },
]

export const generatedLinks = siteDevelopmentSections.map(
  (siteDevelopmentSection, index) => ({
    id: siteDevelopmentSection.id,
    desc: siteDevelopmentSection.title,
    link: index + 1,
  })
)

export const reverseDisplayForEvenSection = (
  index: number,
  styles: { readonly [key: string]: string }
) => (index % 2 === 0 ? "" : styles.reverse)

export const generateSections = (
  styles: {
    readonly [key: string]: string
  },
  scrollContainerRef: RefObject<HTMLDivElement>,
  scrollHandlerRef: RefObject<ScrollHandler>
) =>
  [
    <section key="introduction" className={styles.introduction}>
      <h1 className="title">
        Welcome to <LogoText /> Coorperation
      </h1>
      <div className={styles.info}>
        <Navigator
          label={"Site Navigation"}
          links={generatedLinks}
          onLinkClick={(link: string | number) =>
            scrollHandlerRef?.current?.scroll(Number(link))
          }
        />
        <article>
          <div className="px-3">
            <p className="px-0">
              This is a sandbox website for us to explore Web Development.
              <br />
              <br />
              We&apos;re just a regular coder who are keen to explore with Web
              technologies.
              <br />
              But I guess it&apos;s nice to explain
              <i>&quot;How we built this website&quot;</i>
            </p>
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
    ...siteDevelopmentSections.map((siteDevelopmentSection, index) => {
      if (siteDevelopmentSection.skip) return null
      return (
        <section
          key={siteDevelopmentSection.id}
          className={reverseDisplayForEvenSection(index, styles)}
        >
          <article>
            <h2 className="title">{siteDevelopmentSection.title}</h2>
            {siteDevelopmentSection.desc}
            {siteDevelopmentSection.link && (
              <Button
                href={siteDevelopmentSection.link.src}
                target="_workflow"
                color="orange"
              >
                {siteDevelopmentSection.link.label}
              </Button>
            )}
          </article>
          {siteDevelopmentSection.img && (
            <div className={styles.snapshots}>
              <Image
                src={siteDevelopmentSection.img}
                alt={siteDevelopmentSection.title}
                width={640}
                height={400}
              />
            </div>
          )}
        </section>
      )
    }),
    <section key="short-clip-about-us">
      <div className={`center ${styles.miscellaneous}`}>
        <h2>{siteDevelopmentSections[6].title}</h2>
        <Video
          src="/movie/about-walcron.mp4"
          imgJpgSrc="/img/welcome/girl-in-glass.jpg"
          imgWebpSrc="/img/welcome/girl-in-glass.webp"
          imgAlt="women in a lens"
          preload="none"
        />
      </div>
    </section>,
  ].filter((section) => section !== null)
