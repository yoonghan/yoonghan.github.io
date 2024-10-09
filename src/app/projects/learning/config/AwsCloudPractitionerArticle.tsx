"use client"

import Link from "@/components/Link"
import { Accordion } from "@yoonghan/walcron-microfrontend-shared"

const model = [
  {
    label: "Instances",
    content: "Spot Instances, On Demand, Dedicated Hosts, Capacity Reserved",
  },
  {
    label: "Shared Responsibility",
    content:
      "Responsibility for Patch Management, Configuration Management and Awareness and Training",
  },
  {
    label: "Cloud Adoption Framework (CAF)",
    content:
      "Business, People, Governence, Platform, Security and Operation Perspective",
  },
  {
    label: "Migration Strategy",
    content:
      "Rehosting, Replatforming, Retire, Repurchase, Refactoring and Retaining",
  },
  {
    label: "Well Architecture",
    content:
      "Operation Excellence -> Security -> Reliability -> Performance Efficiency -> Cost Optimisation -> Sustainability",
  },
  {
    label: "Advantages",
    content:
      "Trade Fixed Expenses for Variable Expenses, Benefit from Massive scale of Economics, Stop Guessing Capacity, Increase Speed & Agiity, Stop Spending money running & maintaining data cener, Go global in minutes",
  },
]

export function AwsCloudPractitionerArticle() {
  return (
    <article>
      <p className="text-2xl">
        AWS Certified Cloud Practitioner [
        <Link href="https://www.credly.com/go/5n0LMkUAb2PkOxXN3HzbvA">
          Certified
        </Link>
        ]
      </p>
      <Accordion model={model} groupName={"aws-cloud-practitioner"} />
    </article>
  )
}
