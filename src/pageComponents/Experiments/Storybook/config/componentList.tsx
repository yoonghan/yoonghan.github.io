import Menu from "@/components/Menu"
import dynamic from "next/dynamic"
import ButtonsBar from "./ButtonsBar"
import Cards from "./Cards"
import Tables from "./Tables"

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
]
