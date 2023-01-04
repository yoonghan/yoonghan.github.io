import CommandBar from "@/components/CommandBar"
import Footer from "@/components/Footer"
import Button from "@/components/Button"
import HtmlHead from "@/components/HtmlHead"
import Image from "next/image"
import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import styles from "@/pageComponents/Projects/Projects.module.css"

//Images
import imgBrowserDownloadChunk from "@/images/lesson/1/browser-download-chunk.jpg"
import imgAnalyzeReportSize from "@/images/lesson/1/analyze-report-size.jpg"
import imgTypescriptImport from "@/images/lesson/1/typescript-import.jpg"
import imgFinalResult from "@/images/lesson/1/final-result.jpg"

const Lessons = ({}) => {
  return (
    <>
      <HtmlHead title={"Lesson"} description={"Lessons learned"} />
      <div>
        <CommandBar />
      </div>
      <div className={`${styles.container}`}>
        <div className={`page-aligned-container`}>
          <h1 className="title">Lessons learned from projects</h1>
          <span>What was learned over time for the projects.</span>
          <br />
          <br />
          <article>
            <h2>Large JS Chunks in Walcron website</h2>
            <hr />
            <span className={styles.alert}>Issues we faced</span>
            <ul>
              <li>
                Page speed reported initial load JS for Walcron was large.
              </li>
              <li>Page load was slow when throttled with slow 3G.</li>
            </ul>
            <span className={styles.success}>Analysis did</span>
            <ol>
              <li>
                Check on browser the file size loaded. Found one of the big
                chunk goes up-to 837kb.
                <div className={styles.lessonImg}>
                  <Image
                    src={imgBrowserDownloadChunk}
                    alt="Chunk size was big"
                  />
                </div>
              </li>
              <li>
                Ran `npm run analyze`, which was configured in next.config.js.
                Shows the big chunk was due to typescript ~902kb to load.
                <div className={styles.lessonImg}>
                  <Image src={imgAnalyzeReportSize} alt="Big file size" />
                </div>
              </li>
              <li>
                The whole project was written in typescript, but strangely it
                should was imported and wasn&apos; compiled! Then did a search
                and found a file <strong>importing the WHOLE typescript</strong>{" "}
                !
                <div className={styles.lessonImg}>
                  <Image src={imgTypescriptImport} alt="Imported typescript" />
                </div>
              </li>
              <li>
                Check alternative to find how &apos;eval&apos; can be replaced.
                Unlike lodash, transpile is included only in typescript.
                Apparently eval can be replaced, it&apos;s actually{" "}
                <i>Function</i>.
                <Button href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval">
                  Global_Object
                </Button>
                <div className={styles.code}>
                  const evaluatedResult = Function(&ldquo;&quot;use
                  strict&quot;;return $&#123;mathEval&#125;&rdquo;)() return
                  evaluatedResult
                </div>
              </li>
              <li>
                Replaced code with Function and file size was fixed!
                <div className={styles.lessonImg}>
                  <Image src={imgFinalResult} alt="Small JS chunks only" />
                </div>
              </li>
            </ol>
          </article>
          <article>
            <h2>Testing with Object.defineProperty</h2>
            <p>
              Test suite that have Object.definedProperty override on certain
              behaviours cannot be redefined. If test case runs after it&apos;s
              used hence it cannot be erased.
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
              Jest mocked import for library order is important and must always
              be the first to override the import of the original 3rd party
              library.
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
          <article>
            <h2>
              Jest library with 3rd party library import under NEXT.JS is
              unsolvable
            </h2>
            <p>
              Error of `Cannot use import statement outside a module`, cannot be
              solved at the moment when 3rd party library are executed via mock.
              Only solution is to mock the whole library with
              jest.mock(&apos;whole library&apos;).
            </p>
          </article>
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}

export default memo(Lessons)
