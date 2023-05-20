import Parallax, { ScrollHandler } from "@/components/Parallax"
import { getCookie, setCookie } from "cookies-next"
import type { NextPageContext } from "next"
import { generateSections } from "@/pageComponents/Homepage/config"
import styles from "@/pageComponents/Homepage/Homepage.module.css"
import { useMemo, useRef } from "react"
import HtmlHead from "@/components/HtmlHead"
import PageReaderIndicator from "@/components/PageReaderIndicator"
import SocialFab from "@/components/SocialFab"
import Cookie from "@/components/Cookie"
import Footer from "@/components/Footer"
import LetterBox from "@/components/LetterBox"
import Menu from "@/components/Menu"

interface Props {
  termsRead: boolean
}

function Index({ termsRead }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollHandlerRef = useRef<ScrollHandler>(null)

  const sections = useMemo(
    () => generateSections(styles, scrollContainerRef, scrollHandlerRef),
    []
  )

  return (
    <div className={styles.container}>
      <HtmlHead
        title={"Walcron"}
        description={
          "Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes."
        }
      />

      <main className={styles.homepage}>
        <PageReaderIndicator scrollContainer={scrollContainerRef} />
        <div ref={scrollContainerRef} id="parallax-container">
          <Menu />
          <Parallax scrollContainer={scrollContainerRef} ref={scrollHandlerRef}>
            {sections}
          </Parallax>
          <div
            key="contact us"
            className={`${styles.section} ${styles.miscellaneous}`}
          >
            <div className={"center"}>
              <h2>Contact Us</h2>
              <div className="p-padding">
                <LetterBox />
              </div>
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
          ,
          <Footer />
        </div>
        <SocialFab />
      </main>
      <Cookie isClosed={termsRead} cookieName={"termsRead"} />
    </div>
  )
}

export async function getServerSideProps({ req, res }: NextPageContext) {
  let cookieTermsRead = !!getCookie("termsRead", { req, res })
  if (!cookieTermsRead) {
    setCookie("termsRead", "true", { res, req, maxAge: 60 * 60 * 24 * 365 })
  }

  return {
    props: {
      termsRead: cookieTermsRead,
    },
  }
}

export default Index
