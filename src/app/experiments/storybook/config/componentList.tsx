import dynamic from "next/dynamic"
import ButtonsBar from "./ButtonsBar"
import Cards from "./Cards"
import Tables from "./Tables"
import { ArrowKeyboard } from "./PopupKeyboard"
import Canvases from "./Canvases"
import ScrollableListDemo from "./ScrollableList"
import { OrderedFigure, ReversedFigure } from "./Figure"
import Lifecycle from "@/components/Lifecycle"
import Animate from "./Animate"
import FunkyScroller from "@/components/Animate/FunkyScroller"

const NoSSRDialog = dynamic(() => import("./Dialogs"))

export const storyBookList = [
  {
    title: "Animate",
    component: <Animate />,
  },
  {
    title: "FunkyScroller",
    component: <FunkyScroller title="FunkyScroller" />,
  },
  {
    title: "Buttons Bar",
    component: ButtonsBar,
  },
  {
    title: "Dialogs",
    component: <NoSSRDialog />,
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
    component: <ArrowKeyboard />,
  },
  {
    title: "Canvases",
    component: <Canvases />,
  },
  {
    title: "ScrollableList",
    component: <ScrollableListDemo />,
  },
  {
    title: "Lifecycle",
    component: (
      <Lifecycle
        models={[
          { url: "https://www.google.com", label: "one" },
          { url: "https://www.google.com", label: "two" },
          { url: "https://www.google.com", label: "three" },
          { url: "https://www.google.com", label: "four" },
        ]}
      />
    ),
  },
]
