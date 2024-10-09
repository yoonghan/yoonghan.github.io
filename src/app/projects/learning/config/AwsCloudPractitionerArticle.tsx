"use client"

import Link from "@/components/Link"
import { Accordion } from "@yoonghan/walcron-microfrontend-shared"

const model = [
  {
    label: "Instances",
    content: (
      <ul>
        <li>Spot Instances</li>
        <li>On Demand</li>
        <li>Reserved Instances (1 yr / 3yr)</li>
        <li>Convertible Reserved Instances (Only 1 Available Zone)</li>
        <li>Savings Plan (min usage of RI)</li>
        <li>Dedicated Hosts (License)</li>
      </ul>
    ),
  },
  {
    label: "Shared Responsibility",
    content:
      "Responsibility for Patch Management, Configuration Management and Awareness and Training",
  },
  {
    label: "Cloud Adoption Framework (CAF)",
    content: (
      <ul>
        <li>Business Perspective</li>
        <li>People Perspective</li>
        <li>Governence Perspective</li>
        <li>Platform Perspective</li>
        <li>Security and Operation Perspective</li>
      </ul>
    ),
  },
  {
    label: "Migration Strategy",
    content: (
      <ul>
        <li>Rehosting</li>
        <li>Replatforming</li>
        <li>Retire</li>
        <li>Repurchase</li>
        <li>Refactoring and Retaining / Rearchitecture</li>
      </ul>
    ),
  },
  {
    label: "Well Architecture",
    content:
      "Operation Excellence → Security → Reliability → Performance Efficiency → Cost Optimisation → Sustainability",
  },
  {
    label: "Advantages",
    content: (
      <ul>
        <li>Trade Fixed Expenses for Variable Expenses</li>
        <li>Benefit from Massive scale of Economics</li>
        <li>Stop Guessing Capacity</li>
        <li>Increase Speed & Agiity</li>
        <li>{"Stop Spending money running & maintaining data center"}</li>
        <li>Go global in minutes</li>
      </ul>
    ),
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
