"use client"

import Link from "@/components/Link"

export function AzureCosmosDBDeveloperSpecialty() {
  return (
    <article>
      <p className="text-2xl">
        Microsoft Certified: Azure Cosmos DB Developer Specialty(DP-420)
      </p>
      <p>
        In-depth knowledge of Azure Cosmos DB and how to use it in real world
        scenarios. Very useful for developers to design NoSQL solutions. This
        exam&apos;s fun place is that most resources can be obtain in 1 umbrella
        link which is{" "}
        <Link href="https://learn.microsoft.com/en-us/azure/cosmos-db/overview">
          Azure Cosmos DB Overview
        </Link>
        .
      </p>
      <strong>Notes:</strong>{" "}
      <Link href="https://github.com/users/yoonghan/projects/9/views/1">
        Azure Cosmos DB Developer Specialty
      </Link>
    </article>
  )
}
