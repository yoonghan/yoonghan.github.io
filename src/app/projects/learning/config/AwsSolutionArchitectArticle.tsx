"use client"

import { Accordion } from "@yoonghan/walcron-microfrontend-shared"

const model = [
  {
    label: "Management Console",
    content: (
      <ul>
        <li>CLI -&gt; create access key </li>
        <li>
          Role -&gt; AWS Service, AWS Account, Web Identity, SAML 2.0 Factory
        </li>
        <li>
          Security Tools
          <ul className="pl-4">
            <li>
              IAM Credential Reports(all users + various credential + last used)
            </li>
            <li>IAM Access Advisor(services access & not & permission)</li>
          </ul>
        </li>
        <li>
          Guidelines
          <ul className="pl-4">
            <li>{"Don't"} use root access except to create account</li>
            <li>One physical user = One access user</li>
            <li>Assign user to group & assign permission to group</li>
            <li>Create strong password</li>
            <li>Enforce MFA - virtual, universal, hardware FOB</li>
            <li>Create & use role for giving permission to AWS Service</li>
            <li>Use Access Key for program access (CLI, SDK)</li>
            <li>Audit permission of account using IAM Credential</li>
            <li>Never share IAM user & access key</li>
          </ul>
        </li>
        <li>IAM Role & IAM Policies(JSON)</li>
        <li>
          <pre className="code">
            {`{
                Version: 2012-10-07
                Id: "s3-access",
                Statement: [
                    {"{"}
                        "sid": 10202
                        "Effect": "Allow" // Deny
                        "Princial": {"{"}
                            "AWS": ["arn.aws..."],
                            "Canonical user": "123",
                            "Federated": []
                        "Resource": "s3:mybucket" //NOT Resource
                        {"}"}
                    {"}"}
                ]
            }`}
          </pre>
        </li>
      </ul>
    ),
  },
  {
    label: "Instances",
    content: (
      <ul>
        <li>Have an instance store.</li>
        <li>
          <ul className="pl-4">
            <li>On-Demand</li>
            <li>Reserved Instanced & Convertible</li>
            <li>
              Saving Plans - commit of min usage and allow convertible, get
              charged even not used (used to be Capacity Reserved)
            </li>
            <li>Spot Instance</li>
            <li>Dedicated Host</li>
            <li>Dedicated Instance</li>
          </ul>
        </li>
        <li>Spot Instance can only terminate if Open/Active/Disabled</li>
        <li>Spot can have x5, c5 in instances too</li>
        <li>
          Spot Fleet - Set of instance + optional on Demand
          <ul className="pl-4">
            <li>Lowest Price</li>
            <li>Diversified</li>
            <li>Capacity Optimized</li>
            <li>Price Capacity Optimized</li>
          </ul>
        </li>
        <li>Elastic IP - &gt; 1 public ip, max 5</li>
        <li>
          Elastic Network Interface (ENI) - &gt; 1 private ip, same Az and has
          MAC Address
        </li>
        <li>
          Placement group:
          <ul>
            <li>Cluster - same Az</li>
            <li>Spread - Different region or Az, 1 Az max 7</li>
            <li>
              Partition - up to 7 partition, partition do not share rack &amp;
              can be in same Az or not
            </li>
          </ul>
        </li>
        <li>
          Hibernate - only if EBS encryption enabled, save the RAM state. Only
          charge storage.
        </li>
        <li>
          Instance Store - ephemeral, physical and very high IOP, emptied when
          stop.
        </li>
      </ul>
    ),
  },
  {
    label: "EBS",
    content: (
      <ul>
        <li>Root volume type are default deleted on terminate.</li>
        <li>{"It's"} a network drive.</li>
        <li>To move to new Az use snapshot</li>
        <li>can use for Hibernate needs to use encrypt</li>
        <li>Snapshot archive are cheaper (72%) but takes 24-72 restore</li>
        <li>Recycle bin 1 to 1 year retention</li>
        <li>Fast snapshot restore - $$$$</li>
        <li>
          Types:{" "}
          <ul>
            <li>
              (General SSD) gp3 - can increate IOP to 16k, throughput 1000MBis
            </li>
            <li>gp2 - max 16k with 3 IOP per GB, 5334 max IOPs</li>
            <li>(Provisioned IPs) io1 - 4-16GB, max PIOP 64k</li>
            <li>io2 - max 256k with 1000:1, Support EBS multi-attached</li>
            <li>(HDD) st1 - 125GB-16TB</li>
            <li>(Cold HDD) sc1 - infrequent access 250 IOP</li>
          </ul>
        </li>
        <li>
          Multi-attached is only for Same Az, max 16 EC, and for filesystem that
          is cluster aware (linux)
        </li>
      </ul>
    ),
  },
  {
    label: "AMI",
    content: (
      <ul>
        <li>Snapshot templates and even EBS storage.</li>
        <li>Region specific but can be copied over via console/commandline.</li>
      </ul>
    ),
  },
]

export function AwsSolutionArchitectArticle() {
  return (
    <article>
      <p className="text-2xl">AWS Solution Architect Associate</p>
      <Accordion model={model} groupName={"aws-solution-architect"} />
    </article>
  )
}
