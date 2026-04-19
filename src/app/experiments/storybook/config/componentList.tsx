import dynamic from "next/dynamic"
import FunkyScroller from "@/components/Animate/FunkyScroller"
import Lifecycle from "@/components/Lifecycle"
import Animate from "./Animate"
import ButtonsBar from "./ButtonsBar"
import Canvases from "./Canvases"
import Cards from "./Cards"
import { OrderedFigure, ReversedFigure } from "./Figure"
import { ArrowKeyboard } from "./PopupKeyboard"
import ScrollableListDemo from "./ScrollableList"
import Tables from "./Tables"

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