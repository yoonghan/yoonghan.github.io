import Button from "@/components/Button"
import { usePwaHooks } from "@/components/CommandBar/PwaEnabler/usePwaHooks"
import Table from "@/components/Table"
import { CronJob } from "@prisma/client"
import { useCallback, useEffect, useMemo, useState } from "react"

export interface PostedJob {
  createdAt: string
  jobName: string
}

export const CronJobCheckList = ({ postedJob }: { postedJob?: PostedJob }) => {
  const [jsLocalDate, setJsLocalDate] = useState(postedJob?.createdAt)
  const [cronHistory, setCronHistory] = useState<CronJob[] | null>(null)

  const convertToLocalDate = useCallback((createdAt?: string) => {
    if (!createdAt) {
      return "N/A"
    }
    return new Date(createdAt).toLocaleString()
  }, [])

  const onClickViewMore = useCallback(async () => {
    const response = await fetch("/api/cron?view=history")
    const json: CronJob[] = await response.json()
    setCronHistory(json)
  }, [])

  useEffect(() => {
    setJsLocalDate(convertToLocalDate(postedJob?.createdAt))
  }, [convertToLocalDate, postedJob?.createdAt])

  const histories = useMemo(() => {
    if (cronHistory !== null) {
      return (
        <Table
          headers={["Job Created At", "Job Name"]}
          list={cronHistory.map((history) => ({
            "Job Created At": convertToLocalDate(`${history.createdAt}`),
            "Job Name": history.jobName,
          }))}
        />
      )
    }
    return <></>
  }, [convertToLocalDate, cronHistory])

  useEffect(() => {
    setJsLocalDate(convertToLocalDate(postedJob?.createdAt))
  }, [convertToLocalDate, postedJob?.createdAt])

  return (
    <section>
      <h3>CronJob</h3>
      <p>Check Cron job has executed.</p>
      <Table
        headers={["Active", "Last Execution", "Job Executed"]}
        list={[
          {
            Active: postedJob ? "True" : "False",
            "Last Execution": jsLocalDate,
            "Job Executed": postedJob?.jobName || "N/A",
          },
        ]}
      />
      {cronHistory == null && (
        <Button onClick={onClickViewMore} color="orange">
          View More
        </Button>
      )}
      {cronHistory !== null && histories}
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
