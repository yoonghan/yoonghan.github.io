import CommandBar from "@/components/CommandBar"
import Footer from "@/components/Footer"
import Head from "next/head"
import HtmlHead from "@/components/HtmlHead"
import Card from "@/components/Card"
import { memo } from "react"
import ScrollToTop from "@/components/ScrollToTop"
import styles from "@/pageComponents/Listing/Listing.module.css"
import LetterBox from "@/components/LetterBox"

const Listing = ({}) => {
  return (
    <>
      <HtmlHead
        title={"Listing"}
        description={"Playground projects that we had been working on."}
      />
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.6.1/css/all.min.css"
        />
      </Head>
      <div>
        <CommandBar />
      </div>
      <div className={`${styles.container}`}>
        <div className={`page-aligned-container`}>
          <h1 className="title">Playground projects</h1>
          <section>
            <p>
              Projects that we are working on
              <small>(due to migration most are not moved over)</small>
            </p>
            <Card
              cards={[
                {
                  id: "r-prototyper",
                  title: "Customer Prototyper",
                  description:
                    "Generate a powerpoint like static non-hosted webpage. " +
                    "Useful for presentation and sending mockups to customers for visual views. ",
                  href: "https://github.com/yoonghan/react-templating",
                },
                {
                  id: "rn-android",
                  title: "React Native Android Bridging",
                  description:
                    "A tutorial to demo Android Bridging. One of my popular github forked project.",
                  href: "https://github.com/yoonghan/RN_Android_Native",
                },

                {
                  id: "rn-crazy",
                  title: "React Native Crazy Idea",
                  description:
                    "Experimenting a POC of Modular Apps. Idea is Mini Apps can be installed separately from a hosted website, what special is that those miniapps can use Native features like camera and written separately.",
                  href: "https://github.com/yoonghan/ReactNative-Modular",
                },
              ]}
            />
          </section>
        </div>
        <hr />
        <section>
          <h2>Contact</h2>
          <div className="p-padding center">
            <LetterBox />
          </div>
        </section>
        <Footer isRelative={true} />
        <ScrollToTop />
      </div>
    </>
  )
}

export default memo(Listing)
