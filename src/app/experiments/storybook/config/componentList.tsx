import MegaMenu from "@/components/MegaMenu"
import dynamic from "next/dynamic"
import ButtonsBar from "./ButtonsBar"
import Cards from "./Cards"
import Tables from "./Tables"
import PopupKeyboard from "./PopupKeyboard"
import Canvases from "./Canvases"
import ScrollableListDemo from "./ScrollableList"
import { OrderedFigure, ReversedFigure } from "./Figure"

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
    component: <MegaMenu />,
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
    title: "Figure",
    component: <OrderedFigure />,
  },
  {
    title: "Reversed Figure",
    component: <ReversedFigure />,
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
