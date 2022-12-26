import dynamic from "next/dynamic"
import ButtonsBar from "./ButtonsBar"

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
]
