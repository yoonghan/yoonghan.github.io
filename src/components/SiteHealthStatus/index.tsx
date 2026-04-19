import Link from "@/components/Link"

interface SiteHealthStatusProps {
	repo: string
	codecovToken: string
}

function SiteHealthStatus({
	repo,
	codecovToken,
}: Readonly<SiteHealthStatusProps>) {
	const sonarId = repo.replace("/", "_")
	const badgeClass = "inline border-0 mr-2 mb-2"

	return (
		<p className="text-justify whitespace-normal break-words">
			<Link
				href={`https://github.com/${repo}/actions/workflows/merge.yml`}
			>
				{/* biome-ignore lint: expected */}
				<img
					src={`https://github.com/${repo}/actions/workflows/merge.yml/badge.svg`}
					alt="Report merged result on main branch"
					className={badgeClass}
				/>
			</Link>
			<Link href={`https://codecov.io/gh/${repo}`}>
				{/* biome-ignore lint: expected */}
				<img
					src={`https://codecov.io/gh/${repo}/graph/badge.svg?token=${codecovToken}`}
					alt="Code coverage"
					className={badgeClass}
				/>
			</Link>
			<Link href={`https://sonarcloud.io/summary/new_code?id=${sonarId}`}>
				{/* biome-ignore lint: expected */}
				<img
					src={`https://sonarcloud.io/api/project_badges/measure?project=${sonarId}&metric=bugs`}
					alt="Bugs"
					className={badgeClass}
				/>
			</Link>
			<Link href={`https://sonarcloud.io/summary/new_code?id=${sonarId}`}>
				{/* biome-ignore lint: expected */}
				<img
					src={`https://sonarcloud.io/api/project_badges/measure?project=${sonarId}&metric=code_smells`}
					alt="Code Smells"
					className={badgeClass}
				/>
			</Link>
			<Link href={`https://sonarcloud.io/summary/new_code?id=${sonarId}`}>
				{/* biome-ignore lint: expected */}
				<img
					src={`https://sonarcloud.io/api/project_badges/measure?project=${sonarId}&metric=vulnerabilities`}
					alt="Vulnerabilities"
					className={badgeClass}
				/>
			</Link>
			<Link href={`https://sonarcloud.io/summary/new_code?id=${sonarId}`}>
				{/* biome-ignore lint: expected */}
				<img
					src={`https://sonarcloud.io/api/project_badges/measure?project=${sonarId}&metric=security_rating`}
					alt="Security Rating"
					className={badgeClass}
				/>
			</Link>
		</p>
	)
}

export default SiteHealthStatus