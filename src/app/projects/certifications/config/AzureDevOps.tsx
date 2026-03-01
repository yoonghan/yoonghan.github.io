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
        implement DevOps solutions on Azure. It is a challenging exam that
        requires a good understanding of Azure DevOps and DevOps practices. Most
        learning resources can be obtained from Microsoft Learn.
      </p>
      <strong>Additional Notes:</strong>{" "}
      <Link href="https://github.com/users/yoonghan/projects/4">
        Azure DevOps
      </Link>
    </article>
  )
}
