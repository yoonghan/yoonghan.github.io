import Menu from "@/components/MegaMenu"
import dynamic from "next/dynamic"
import ButtonsBar from "./ButtonsBar"
import Cards from "./Cards"
import Tables from "./Tables"
import PopupKeyboard from "./PopupKeyboard"
import Canvases from "./Canvases"
import ScrollableListDemo from "./ScrollableList"

const NoSSRDialog = dynamic(() => import("./Dialogs"), {
  ssr: false,
})

export const storyBookList = [
  {
    title: "Buttons Bar",
    component: ButtonsBar,
  },
  {
    title: "Dialogs",
    component: <NoSSRDialog />,
  },
  {
    title: "Menu",
    component: <Menu />,
  },
  {
    title: "Cards",
    component: Cards,
  },
  {
    title: "Table",
    component: Tables,
  },
  {
    title: "Keyboard",
    component: PopupKeyboard,
  },
  {
    title: "Canvases",
    component: <Canvases />,
  },
  {
    title: "ScrollableList",
    component: <ScrollableListDemo />,
  },
]
