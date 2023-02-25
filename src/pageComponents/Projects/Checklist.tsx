import { usePwaHooks } from "@/components/CommandBar/PwaEnabler/usePwaHooks"
import Table from "@/components/Table"

export interface PostedJob {
  createdAt: string
  jobName: string
}

export const CronJobCheckList = ({ postedJob }: { postedJob?: PostedJob }) => {
  const convertToTodaysDate = (createdAt?: string) => {
    if (!createdAt) {
      return "N/A"
    }
    return new Date(createdAt).toLocaleString()
  }

  return (
    <section>
      <h3>CronJob</h3>
      <p>Check Cron job has executed.</p>
      <Table
        headers={["Active", "Last Execution", "Job Executed"]}
        list={[
          {
            Active: postedJob ? "True" : "False",
            "Last Execution": convertToTodaysDate(postedJob?.createdAt),
            "Job Executed": postedJob?.jobName || "N/A",
          },
        ]}
      />
    </section>
  )
}

export const TroubleshootPwaCheckList = () => {
  const {
    isRegistered,
    isTwaApp,
    isLatestInstalled,
    hasLatestUpdate,
    isOffline,
  } = usePwaHooks(false)

  const changeStatus = (status: boolean) => (status ? "true" : "false")

  const lists: { Property: string; Status: string }[] = [
    {
      Property: "PWA Registered",
      Status: changeStatus(isRegistered),
    },
    {
      Property: "Trusted Site App (N/R, query string issue)",
      Status: changeStatus(isTwaApp),
    },
    {
      Property: "Detected New Update (N/T)",
      Status: changeStatus(hasLatestUpdate),
    },
    {
      Property: "Update Installed (N/T)",
      Status: changeStatus(isLatestInstalled),
    },
    {
      Property: "PWA run offline",
      Status: changeStatus(isOffline),
    },
  ]

  return (
    <section>
      <h3>PWA</h3>
      <p>Page is pwa compatible.</p>
      <Table headers={["Property", "Status"]} list={lists} />
      <div>
        <small>N/T = Not tested, </small>
        <small>N/R = Not reliable </small>
      </div>
    </section>
  )
}
