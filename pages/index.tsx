import Parallax, { ScrollHandler } from "@/components/Parallax"
import { getCookie, hasCookie } from "cookies-next"
import type { NextPageContext } from "next"
import { generateSections } from "@/pageComponents/Homepage/config"
import styles from "@/pageComponents/Homepage/Homepage.module.css"
import { useMemo, useRef } from "react"
import HtmlHead from "@/components/HtmlHead"
import PageReaderIndicator from "@/components/PageReaderIndicator"
import CommandBar from "@/components/CommandBar"
import SocialFab from "@/components/SocialFab"
import Cookie from "@/components/Cookie"
import Footer from "@/components/Footer"

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
    <div className="container">
      <HtmlHead
        title={"Walcron"}
        description={
          "Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes."
        }
      />

      <main className={styles.homepage}>
        <PageReaderIndicator scrollContainer={scrollContainerRef} />
        <div ref={scrollContainerRef} id="parallax-container">
          <CommandBar />
          <Parallax scrollContainer={scrollContainerRef} ref={scrollHandlerRef}>
            {sections}
          </Parallax>
        </div>
        <SocialFab />
      </main>
      <Cookie isClosed={termsRead} cookieName={"termsRead"} />
      <Footer className={"footer"} />
    </div>
  )
}

export async function getServerSideProps({ req, res }: NextPageContext) {
  return {
    props: {
      termsRead: hasCookie("termsRead", { req, res })
        ? getCookie("termsRead", { req, res })
        : false,
    },
  }
}

export default Index
