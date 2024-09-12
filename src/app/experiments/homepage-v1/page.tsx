"use client"

import Parallax, { ScrollHandler } from "@/components/Parallax"
import { generateSections } from "./config"
import styles from "./Homepage.module.css"
import { useMemo, useRef } from "react"
import SocialFab from "@/components/SocialFab"
import LetterBox from "@/components/LetterBox"

function Homepage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollHandlerRef = useRef<ScrollHandler>(null)

  const sections = useMemo(
    () => generateSections(styles, scrollContainerRef, scrollHandlerRef),
    []
  )

  return (
    <div className={styles.container}>
      <main className={styles.homepage}>
        <div ref={scrollContainerRef} id="parallax-container">
          <Parallax scrollContainer={scrollContainerRef} ref={scrollHandlerRef}>
            {sections}
          </Parallax>
          <div
            key="contact us"
            className={`${styles.section} ${styles.miscellaneous}`}
          >
            <div className={styles.center}>
              <LetterBox />
              <div className="section-end">
                <small>
                  This website is powered with: Next.JS with Typescript on
                  Vercel
                </small>
                <div
                  onClick={() => scrollHandlerRef?.current?.scrollToTop()}
                  onKeyUp={() => scrollHandlerRef?.current?.scrollToTop()}
                  className={styles.link}
                  role="button"
                  tabIndex={0}
                >
                  Return to top
                </div>
              </div>
            </div>
          </div>
        </div>
        <SocialFab />
      </main>
    </div>
  )
}

export default Homepage
