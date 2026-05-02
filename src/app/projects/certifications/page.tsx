import type { Metadata } from "next"
import { memo } from "react"
import Link from "@/components/Link"
import ScrollToTop from "@/components/ScrollToTop"
import { site } from "@/config/site"
import { AIPractitioner } from "./config/AIPractitioner"
import { AwsCloudPractitionerArticle } from "./config/AwsCloudPractitionerArticle"
import { AwsSolutionArchitectArticle } from "./config/AwsSolutionArchitectArticle"
import { AzureDevOps } from "./config/AzureDevOps"
import { NpmCommands } from "./config/NpmCommands"
import { OpenClaw } from "./config/OpenClaw"

export const metadata: Metadata = {
	title: "Learning",
	description: "Certification and thing learnt.",
	alternates: {
		...site.generateCanonical("/projects/learning"),
	},
}

const Learning = () => {
	return (
		<div className="walcron-container">
			<h1>Certification</h1>
			<p className="mb-8">
				Having taken some certifications over the years, I&apos;ve
				decided to put them here for reference. I&apos;m not a big fan
				of certifications, but they are a good way to structure my
				learning and ensure I cover the fundamentals.
			</p>
			<section className="grid grid-column gap-4">
				<article>
					<p className="text-2xl">
						DP-420 Azure Cosmos DB Specialist
					</p>
					Enjoyed this exam as it's practical and hands-on.
					<br />
					<strong>Notes</strong>:{" "}
					<Link href="https://yoonghan.github.io/Azure-Cosmos-DB-DP-420/">
						Azure Cosmos DB Overview
					</Link>
				</article>
				<article>
					<p className="text-2xl">
						AZ-104 / AZ-305 Azure Solution Architect
					</p>
					One of the toughest exam I faced
					<br />
					<strong>Notes</strong>:{" "}
					<Link href="https://yoonghan.github.io/AZ-104-Azure-Administrator-Associate//">
						Azure Administrator Associate (AZ-104)
					</Link>
				</article>
				<OpenClaw />
				<AzureDevOps />
				<AIPractitioner />
				<AwsSolutionArchitectArticle />
				<AwsCloudPractitionerArticle />
				<NpmCommands />
			</section>
			<ScrollToTop />
		</div>
	)
}

export default memo(Learning)