import CommandBar from "@/components/CommandBar"
import Footer from "@/components/Footer"
import HtmlHead from "@/components/HtmlHead"
import Image from "next/image"
import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import styles from "@/pageComponents/Projects/Projects.module.css"
import LetterBox from "@/components/LetterBox"

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
                    src="/img/lesson/1/browser-download-chunk.jpg"
                    alt="Chunk size was big"
                    width="2014"
                    height="1232"
                  />
                </div>
              </li>
              <li>
                Ran `npm run analyze`, which was configured in next.config.js.
                Shows the big chunk was due to typescript ~902kb to load.
                <div className={styles.lessonImg}>
                  <Image
                    src="/img/lesson/1/analyze-report-size.jpg"
                    alt="Big file size"
                    width="2450"
                    height="1200"
                  />
                </div>
              </li>
              <li>
                The whole project was written in typescript, but strangely it
                should was imported and wasn&apos; compiled! Then did a search
                and found a file <strong>importing the WHOLE typescript</strong>{" "}
                !
                <div className={styles.lessonImg}>
                  <Image
                    src="/img/lesson/1/typescript-import.jpg"
                    alt="Imported typescript"
                    width="998"
                    height="408"
                  />
                </div>
              </li>
              <li>
                Check alternative to find how &apos;eval&apos; can be replaced.
                Unlike lodash, transpile is included only in typescript.
                Apparently eval can be replaced, it&apos;s actually{" "}
                <i>Function</i>.
                https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
                <div className={styles.code}>
                  const evaluatedResult = Function(&ldquo;&quot;use
                  strict&quot;;return $&#123;mathEval&#125;&rdquo;)() return
                  evaluatedResult
                </div>
              </li>
              <li>
                Replaced code with Function and file size was fixed!
                <div className={styles.lessonImg}>
                  <Image
                    src="/img/lesson/1/final-result.jpg"
                    alt="Small JS chunks only"
                    width="1332"
                    height="948"
                  />
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
            <pre>
              describe(&quot;xx&quot;, () =&gt; &#123; it(&quot;should
              one&quot;, () =&gt; &#123;...&#124;) --navigator.share = undefined
              it(&quot;should two&quot;, () =&gt;
              &#123;Object.defineProperty(window.navigator,
              &quot;share&quot;...&#124;) it(&quot;should three&quot;, () =&gt;
              &#123;...&#124;) --navigator.share = what defined in &quot;should
              two&quot; &#124;
            </pre>
          </article>
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}

export default memo(Lessons)
