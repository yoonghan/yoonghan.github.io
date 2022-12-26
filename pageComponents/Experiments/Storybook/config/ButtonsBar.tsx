import ButtonsBar from "@/components/ButtonsBar"

const renderButtonsBar = (
  <ButtonsBar
    menuTexts={[
      { title: "title1", link: "link1" },
      { title: "title 2", link: "link2" },
    ]}
    activeIndex={1}
  />
)

export default renderButtonsBar
