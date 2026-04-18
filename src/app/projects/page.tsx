import type { Metadata } from "next";
import { memo } from "react";
import Card from "@/components/Card";
import LetterBox from "@/components/LetterBox";
import ScrollToTop from "@/components/ScrollToTop";
import { site } from "@/config/site";
import { cards } from "./config";

export const metadata: Metadata = {
	title: "Projects Portfolio",
	description: "Playground projects that we had been working on.",
	alternates: {
		...site.generateCanonical("/projects"),
	},
};

const Projects = () => {
	return (
		<div className="walcron-container">
			<h1>Projects Portfolio</h1>
			<div>
				<p>
					Projects that we are working on{" "}
					<small>(due to migration most are not moved over)</small>
				</p>
				<Card cards={cards} />
			</div>

			<hr />
			<div className="py-8">
				<LetterBox />
			</div>
			<ScrollToTop />
		</div>
	);
};

export default memo(Projects);
