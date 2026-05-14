"use client"

import Link from "@/components/Link"

export function AzureDevOps() {
	return (
		<article>
			<p className="text-2xl">
				Microsoft Certified: Azure DevOps Engineer Expert (AZ-400)
			</p>
			<p>
				A practical hands-on exam that tests your ability to design and
				implement DevOps solutions on Azure. It is a challenging exam
				that requires a good understanding of Azure DevOps and DevOps
				practices. Most learning resources can be obtained from
				Microsoft Learn.
			</p>
			<strong>Additional Notes:</strong>{" "}
			<Link href="https://github.com/users/yoonghan/projects/4">
				Azure DevOps
			</Link>
			<ul className="list-disc list-inside">
				<li>Format of User Stories:
					<p>1. Define user role. Fitness Center</p>
					<p>2. Describe function/expectation. Need a billing system.</p>
					<p>3. Reason the user story exists. So that the members can pay for their gym memberships.</p>
				</li>
				<li>Extreme Programming (XP), Agile, Scrum</li>
				<li>Kanban -*gt; Little's law, for stable and make sure few/small WIP to ensure not oversupply.</li>
				<li><Link href="https://www.scrum.org/resources/nexus-guide">Nexus Guide / Scaling</Link></li>
				<li><Link href="https://www.scrumatscale.com/">Scrum at Scale / Scaling</Link></li>
				<li><Link href="https://www.scaledagileframework.com/">Scaled Agile Framework / Scaling</Link></li>
				<li><Link href="https://www.less.work/">Less Framework / Scaling</Link></li>
			</ul>
		</article>
	)
}