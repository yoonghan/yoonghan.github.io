import Link from "@/components/Link"

export interface SiteHealthStatusProps {
    repo: string;
    codecovToken: string;
}

function SiteHealthStatus({ repo, codecovToken }: SiteHealthStatusProps) {
    const sonarId = repo.replace("/", "_")

    return (
        <article>
            <h3 className="text-3xl text-center pb-8" id="status">
                Site Health Status
            </h3>
            <p className="text-justify whitespace-normal break-words">
                <Link href={`https://github.com/${repo}/actions/workflows/merge.yml`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://github.com/${repo}/actions/workflows/merge.yml/badge.svg`}
                        alt="Report merged result on main branch"
                        className="inline border-0 mr-2 mb-2"
                    />
                </Link>
                <Link href={`https://codecov.io/gh/${repo}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://codecov.io/gh/${repo}/graph/badge.svg?token=${codecovToken}`}
                        alt="Code coverage"
                        className="inline border-0 mr-2 mb-2"
                    />
                </Link>
                <Link href={`https://sonarcloud.io/summary/new_code?id=${sonarId}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://sonarcloud.io/api/project_badges/measure?project=${sonarId}&metric=bugs`}
                        alt="Bugs"
                        className="inline border-0 mr-2 mb-2"
                    />
                </Link>
                <Link href={`https://sonarcloud.io/summary/new_code?id=${sonarId}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://sonarcloud.io/api/project_badges/measure?project=${sonarId}&metric=code_smells`}
                        alt="Code Smells"
                        className="inline border-0 mr-2 mb-2"
                    />
                </Link>
                <Link href={`https://sonarcloud.io/summary/new_code?id=${sonarId}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://sonarcloud.io/api/project_badges/measure?project=${sonarId}&metric=vulnerabilities`}
                        alt="Vulnerabilities"
                        className="inline border-0 mr-2 mb-2"
                    />
                </Link>
                <Link href={`https://sonarcloud.io/summary/new_code?id=${sonarId}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://sonarcloud.io/api/project_badges/measure?project=${sonarId}&metric=security_rating`}
                        alt="Security Rating"
                        className="inline border-0 mr-2 mb-2"
                    />
                </Link>
            </p>
        </article>
    )
}

export default SiteHealthStatus
