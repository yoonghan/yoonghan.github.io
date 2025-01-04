import dynamic from "next/dynamic"
import ButtonsBar from "./ButtonsBar"
import Cards from "./Cards"
import Tables from "./Tables"
import { ArrowKeyboard } from "./PopupKeyboard"
import Canvases from "./Canvases"
import ScrollableListDemo from "./ScrollableList"
import { OrderedFigure, ReversedFigure } from "./Figure"
import Lifecycle from "@/components/Lifecycle"

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
