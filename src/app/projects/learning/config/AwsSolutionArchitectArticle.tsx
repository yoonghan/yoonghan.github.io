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
          <ul className="pl-4">
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
        <li>
          To <em>Hibernate</em> at instance stop, needs to use encrypt. It
          stores all RAM into EBS.
        </li>
        <li>Snapshot archive are cheaper (72%) but takes 24-72 restore</li>
        <li>Recycle bin 1 to 1 year retention</li>
        <li>Fast snapshot restore - $$$$</li>
        <li>
          Types:{" "}
          <div>
            only gp(General SSD) &amp; io(Provisioned IPs) can be use as Root
            Volume
          </div>
          <ul className="pl-4">
            <li>gp3 - can increate IOP to 16k, throughput 1000MBis</li>
            <li>gp2 - max 16k with 3 IOP per GB, 5334 max IOPs</li>
            <li>io1 - 4-16GB, max PIOP 64k</li>
            <li>io2 - max 256k with 1000:1, Support EBS multi-attached</li>
            <li>st1 - 125GB-16TB of HDD</li>
            <li>sc1 - infrequent access 250 IOP of Cold HDD</li>
          </ul>
        </li>
        <li>
          Multi-attached is only for Same Az, max 16 EC, and for filesystem that
          is cluster aware (linux)
        </li>
        <li>
          Encryption:
          <ul className="pl-4">
            <li>
              Data is encrypted when 1) at rest, 2) snapshot and 3) in-flight
              between instance and volume
            </li>
            <li>
              To encrypt un-encrypted data -&gt; snapshot -&gt; copy -&gt;
              create new EBS
            </li>
            <li></li>
          </ul>
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
  {
    label: "EFS",
    content: (
      <ul>
        <li>$$$ than 3 gp price</li>
        <li>Encryption at rest using KMS.</li>
        <li>Use NSF v4.1 and Linux based AMI.</li>
        <li>Can be Multi-Az of One Zone. One Zone is only for IA</li>
        <li>Can be access by Lambda, EC2 and Sagemaker</li>
        <li>
          Through Put:
          <ul className="pl-4">
            <li>Provisioned</li>
            <li>Elastic</li>
            <li>Bursting</li>
          </ul>
        </li>
        <li>
          Storage Tier:
          <ul className="pl-4">
            <li>Standard</li>
            <li>Infrequent Access(IA)</li>
            <li>Archive</li>
            <li>Lifecycle Policy - Standard to IA</li>
          </ul>
        </li>
      </ul>
    ),
  },
  {
    label: "Load Balancer",
    content: (
      <ul>
        <li>Enable to EC by security group not ip</li>
        <li>
          Types:
          <ul>
            <li>
              Application Load Balancer - routing table based on hostname, path,
              header or querystring. X-Forwarded-For/Port/Proto. Target group
              can be by ip, instance or lambda.
            </li>
            <li>
              Network Load Balancer - 1 EIP, TCP/UDP, NLB can have sub ALB
            </li>
            <li>
              Gateway Load Balancer - target group is 3rd-party. GENEVA protocol
              6081.
            </li>
          </ul>
        </li>
        <li>Multi Az but spread across Region</li>
        <li>Access via DNS except for Network that has ip</li>
        <li>Can have healthcheck</li>
        <li>
          Sticky Session
          <ul className="pl-4">
            <li>Only GLB no sticky</li>
            <li>AWSALB and AWSALBAPP is for application based cookie</li>
            <li>AWSALB and AWSALBTG is for duration based cookie</li>
          </ul>
        </li>
        <li>
          Cross Zone Balancing - enabled and not by instance, but sub-sub zone.
        </li>
        <li>
          Server Name Indication(SNI) - solve multiple TLS certificate onto one
          webserver/ALB.
        </li>
        <li>
          Connection Draining - allow EC2 to finish all request before shutdown.
          Time based, 0 is disabled.
        </li>
      </ul>
    ),
  },
  {
    label: "Auto Scaling",
    content: (
      <ul>
        <li>
          Launch Template to define AMI, Instance Type, EBS Volume, Security
          Group, SSH key pair, IAM Role, VPC, LB
        </li>
        <li>Specify Min, Max and Initial</li>
        <li>Can use Cloudwatch as alarm</li>
        <li>
          Health check can be for both EC2 / ELB, health check terminates the
          EC2.
        </li>
        <li>
          Scaling strategy <em>Scheduled, Predictive(AI), Dynamic(resource)</em>
          , default is 30second cooldown.
        </li>
        <li>
          Able to integrate with CloudWatch(with custom metric) to trigger
          alarm, and configure scaling to run based on alarm.
        </li>
      </ul>
    ),
  },
  {
    label: "RDS",
    content: (
      <ul>
        <li>Auto scale, if free storage *lt; 10% and for 5minutes</li>
        <li>6 hours past last configuration.</li>
        <li>1 master multiple Replica</li>
        <li>
          Supported Postgres, MySql, MariaDB, Oracle, SqlServer, DB2, Aurora
        </li>
        <li>
          Multi Az support does not require connection string change. (Only read
          replica required)
        </li>
        <li>
          Replica{" "}
          <ul className="pl-4">
            <li>Up to 15 read replica</li>
            <li>Free if same Az</li>
            <li>Sync for multi Az</li>
            <li>Ansync (Eventually Consistent) for same Az</li>
          </ul>
        </li>
        <li>
          Aurora{" "}
          <ul className="pl-4">
            <li>Auto Multi Az &amp; Multi Region</li>
            <li>Regional cluster with 1 writer endpoint and reader endpoint</li>
            <li>
              Only 4 replica up only can write, 3 replica up only can read.
            </li>
            <li>Machine Learning by SageMaker and Comprehend</li>
            <li>
              Can have custom endpoint(a reader endpoint) to point specific
              instance.
            </li>
            <li>Can use serverless - Aurora Fleet</li>
            <li>
              Global Aurora - Cross Region or Global DB (1 primary region,
              up-to-5 secondary region, up-to 16 read replica per region)
            </li>
          </ul>
        </li>
        <li>RDS Proxy - db connection pool and must be private!</li>
        <li>
          ElasticCache{" "}
          <ul className="pl-4">
            <li>Redis Auth - IAM, use password token or SSL</li>
            <li>Memcache - supports SASL based authentication</li>
            <li>Redis supported sorted set guaranteed.</li>
            <li>
              Pattern{" "}
              <ul className="pl-8">
                <li>Lazy Loading</li>
                <li>Write through(add/update db)</li>
                <li>Session Store(ttl)</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>RDS Custom - only Oracle and SQL Server, can SSH to do patch.</li>
        <li>
          Security
          <ul className="pl-4">
            <li>
              Data encrypted at rest, but KMS must be defined on creation.
            </li>
            <li>Master not encrypted, replica is not</li>
            <li>To encrypt an unecrypted, go snapshot route</li>
            <li>IAM Authentication except Oracle and SqlServer, but can SSH</li>
            <li>Audit log can be sent to Cloud Watch</li>
            <li>Security Group to control network.</li>
          </ul>
        </li>
        <li>Backup auto every 5mins. Aurora cannot be disabled)</li>
        <li>Backup snapshot is 1 to 35 days.</li>
        <li>
          Backup Snapshot only restores to new DB and only MySQL/Aurora support
          from S3. Aurora used percona to do it.
        </li>
        <li>Cloning feature only available for Aurora.</li>
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
