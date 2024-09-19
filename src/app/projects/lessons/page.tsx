import Button from "@/components/Button"
import Image from "next/image"
import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"

//Images
import imgBrowserDownloadChunk from "@/images/lesson/1/browser-download-chunk.jpg"
import imgAnalyzeReportSize from "@/images/lesson/1/analyze-report-size.jpg"
import imgTypescriptImport from "@/images/lesson/1/typescript-import.jpg"
import imgFinalResult from "@/images/lesson/1/final-result.jpg"
import { site } from "@/config/site"
import Link from "@/components/Link"

export const metadata = {
  title: "Lessons",
  description: "Lesson learned on CI/CD and web developments.",
  alternates: {
    ...site.generateCanonical("/projects/lessons"),
  },
}

const Lessons = ({}) => {
  return (
    <div className="walcron-container">
      <h1>Lessons learned from projects</h1>
      <span>What was learned over time for the projects.</span>
      <br />
      <br />
      <article className="my-8">
        <h2>Large JS Chunks in Walcron website</h2>
        <hr />
        <span className="text-red-500">Issues we faced</span>
        <ul>
          <li>Page speed reported initial load JS for Walcron was large.</li>
          <li>Page load was slow when throttled with slow 3G.</li>
        </ul>
        <span className="text-green-500">Analysis did</span>
        <ol>
          <li>
            Check on browser the file size loaded. Found one of the big chunk
            goes up-to 837kb.
            <div className="relative">
              <Image src={imgBrowserDownloadChunk} alt="Chunk size was big" />
            </div>
          </li>
          <li>
            Ran `npm run analyze`, which was configured in next.config.js. Shows
            the big chunk was due to typescript ~902kb to load.
            <div className="relative">
              <Image src={imgAnalyzeReportSize} alt="Big file size" />
            </div>
          </li>
          <li>
            The whole project was written in typescript, but strangely it should
            was imported and wasn&apos; compiled! Then did a search and found a
            file <strong>importing the WHOLE typescript</strong> !
            <div>
              <Image
                className="relative"
                src={imgTypescriptImport}
                alt="Imported typescript"
              />
            </div>
          </li>
          <li>
            Check alternative to find how &apos;eval&apos; can be replaced.
            Unlike lodash, transpile is included only in typescript. Apparently
            eval can be replaced, it&apos;s actually <i>Function</i>.
            <Button href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval">
              Global_Object
            </Button>
            <div className={"code"}>
              const evaluatedResult = Function(&ldquo;&quot;use
              strict&quot;;return $&#123;mathEval&#125;&rdquo;)() return
              evaluatedResult
            </div>
          </li>
          <li>
            Replaced code with Function and file size was fixed!
            <div>
              <Image
                className="relative"
                src={imgFinalResult}
                alt="Small JS chunks only"
              />
            </div>
          </li>
        </ol>
      </article>
      <article className="my-8">
        <h2>Testing with Object.defineProperty</h2>
        <p>
          Test suite that have Object.definedProperty override on certain
          behaviours cannot be redefined. If test case runs after it&apos;s used
          hence it cannot be erased.
        </p>
        {/* prettier-ignore */}
        <pre className={"code"}>{`
 describe( "test", () => {
   it("should one", ()=>{console.log(navigator.share)}) // = undefined 
   it("should two", ()=> {Object.defineProperty(window.navigator, "share"...}) 
   it("should three", ()=>; {console.log(navigator.share)}) // = function (); 
 }
            `}</pre>
      </article>
      <article>
        <h2>Jest Library Mock import must always be the first</h2>
        <p>
          Jest mocked import for library order is important and must always be
          the first to override the import of the original 3rd party library.
        </p>
        {/* prettier-ignore */}
        <pre className={"code"}>{`
 import "../__mocked__/pusherMock"; //mock library must be the first.
 import X from "someComponentThatUsesPusher"
 --OR--
 jest.mock('pusher', () => class Pusher{});
 import Pusher from 'pusher'; //then only it takes effect.
            `}</pre>
      </article>
      <article className="my-8">
        <h2>
          Jest library with 3rd party library import under NEXT.JS is unsolvable
        </h2>
        <p>
          Error of `Cannot use import statement outside a module`, cannot be
          solved at the moment when 3rd party library are executed via mock.
          Only solution is to mock the whole library with jest.mock(&apos;whole
          library&apos;).
        </p>
      </article>
      <article className="my-8">
        <h2>GIT commands</h2>
        <p>https://www.internalpointers.com/post/squash-commits-into-one-git</p>
        <pre className={"code"}>{`
            git rebase --interactive HEAD~3
            `}</pre>
      </article>
      <article className="my-8">
        <h2>React Suspense</h2>
        <p>
          A new way to handle asynchronous response. But take notes on this:
        </p>
        <ol>
          <li>
            For it to work with NextJS, it needs to load via client side. Hence
            a need to use dynamic/lazy import.
          </li>
          <li>
            due to dynamic import, one will face a problem if directly routed
            of:
            <i>
              A component suspended while responding to synchronous input. This
              will cause the UI to be replaced with a loading indicator. To fix,
              updates that suspend should be wrapped with startTransition.
            </i>
            . To overcome it (sample in pageComponents/*/SnakeGame.tsx) it,
            simply wrap it in another Suspense tag
            <pre className="code">
              &lt;Suspense&gt;&lt;LazyLoadedComponent/&gt;&lt;/Suspense&gt;
            </pre>
          </li>
        </ol>
      </article>
      <article className="my-8">
        <h3>Google Tag</h3>
        <ul className="list-decimal">
          <li>
            Click on a container and select <strong>Preview</strong>, find a
            button {'"Select Version"'} and do debugging. Do not use
            latest/live.
          </li>
          <li>
            <strong>Trigger some custom events sent to google tag</strong>. All
            google custom events sent with {"'gtag(event)'"} requires manual
            configuration. To do so:
            <ul className="list-decimal pl-4">
              <li>
                Make sure codes sent a gtag event, e.g.
                <pre className="code">{`
 gtag("event", "CLS", {...metrics_id: 1})
 //OR
 gaLibrary.event("CLS", {...metrics_id: 1})
                  `}</pre>
              </li>
              <li>
                Do a preview on the current page and to debug the event sent.
              </li>
              <li>
                Take note if {'"Tag Fired"'}; if it {"doesn't"}, meant something
                needs to be setup in google tag Trigger. Image below has INP
                configured to fire to GTM&apos;s GA.
                <Image
                  src="/img/lesson/gtag/fired-event.png"
                  alt="Fired gtag event"
                  width={500}
                  height={200}
                ></Image>
              </li>
              <li>
                Take note of the event model and this needs to be setup as well.
                In this example for INP event name model is:
                <pre className={"code"}>{`
  eventModel { //take note this is using custom library, in pure gtag it is flat unless defined.
    ...
    metric_delta: 72
    sent_to: 'GTM...'
  }
                  `}</pre>
                <Image
                  src="/img/lesson/gtag/fired-event-data-layer.png"
                  alt="Fired gtag event"
                  width={500}
                  height={200}
                ></Image>
              </li>
            </ul>
          </li>
          <li>
            Setup Google Tag
            <ul className="list-decimal pl-4">
              <li>
                Setup data variables matching the event model with{" "}
                <strong>Variables</strong> by selecting Select New in User
                Defined
              </li>
              <li>
                Create Data Layer Variable, and write the name similar to the
                model. As in this case {'"eventModel.metric.delta"'}. Set as
                Version 2.
                <Image
                  src="/img/lesson/gtag/create-data-layer-variable.png"
                  alt="Create data layer variable"
                  width={500}
                  height={200}
                ></Image>
              </li>
              <li>
                Create a Trigger, name the Event name with a regex (without /)
                and make sure it triggers All Custom Events. Sample means
                matching all INP or CLS or LCP event name.
                <Image
                  src="/img/lesson/gtag/create-event.png"
                  alt="Create event"
                  width={500}
                  height={200}
                ></Image>
              </li>
              <li>
                Create a Tag. For the first step Tag the configuration as
                {'"Google Analytics: GA4 Event"'}. Then:
                <ul className="list-disc pl-4">
                  <li>
                    Get you measurement ID from google analytics -&gt; Admin
                    -&gt; Data Collection and Modification -&gt; Data Stream{" "}
                  </li>
                  <li>
                    Use <em>{`{{ Event }}`}</em> as variable name instead of
                    hardcoding. If hardcoded, all you custom event name will be
                    the new name.
                  </li>
                  <li>
                    Expand Event Parameters and map a new name to the data layer
                    variable created. (Old version have a prefix of DLV)
                  </li>
                  <li>
                    Add in consent with {'"No Additional Consent Required"'}
                  </li>
                  <li>Tie a trigger created with this Event</li>
                </ul>
                <Image
                  src="/img/lesson/gtag/create-tag.png"
                  alt="Create Tag"
                  width={500}
                  height={200}
                ></Image>
              </li>
              <li>
                Publish it then click Preview. During preview make sure debug is
                on and select {'"Version"'} of the newly published version.
              </li>
            </ul>
          </li>
        </ul>
      </article>
      <article className="my-8">
        <h3>CI/CD Caveat</h3>
        <section>
          <title>Gitlab</title>
          <ul>
            <li>
              Variables can only be passed to Downstream triggers with
              <Link href="https://docs.gitlab.com/ee/ci/pipelines/downstream_pipelines.html#pass-cicd-variables-to-a-downstream-pipeline">
                Variables/Artifacts and needs
              </Link>
              . Do not use Needs, it was so hard to troubleshoot.
            </li>
            <li>
              To share variables from different stages, create a dotenv artifact
              (similar to Github). Variables will be pass only if
              <pre className="code">{`
                1) Following stages with no needs command, 
                2) Stages that refer to the dotenv stage.
              `}</pre>
            </li>
            <li>
              {'"needs"'} meant it can skip stages, if there is variable
              required from dotenv stage; include that stage into needs. i.e.
              needs: [stage_that_creates_dotenv, other_stages]
            </li>
            <li>
              before_script and script are actually grouped together, after_script is special even if it fails it will not fail the stage.
            </li>
          </ul>
        </section>
        <section>
          <title>Github</title>
          <ul>
            <li>
              If one is creating actions, remember to add {'"shell: bash"'}
              for jobs running scripts.
            </li>
            <li>
              Remember to use {'"secrets: inherit"'} on parent job to enable
              secret passing to downstream workflow.
            </li>
          </ul>
        </section>
      </article>
      <ScrollToTop />
    </div>
  )
}

export default memo(Lessons)
