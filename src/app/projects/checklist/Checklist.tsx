"use client"

import Button from "@/components/Button"
import { usePwaHooks } from "@/components/CommandBar/PwaEnabler/usePwaHooks"
import ScrollableList from "@/components/ScrollableList"
import Table from "@/components/Table"
import { CronJob } from "@prisma/client"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useFetch } from "usehooks-ts"

export interface PostedJob {
  createdAt: string
  jobName: string
}

export const CronJobCheckList = ({ postedJob }: { postedJob?: PostedJob }) => {
  const [jsLocalDate, setJsLocalDate] = useState(postedJob?.createdAt)
  const [cronHistoryUrl, setCronHistoryUrl] = useState<string | undefined>()
  const { data: cronHistoryData, error: cronHistoryError } =
    useFetch<CronJob[]>(cronHistoryUrl)

  const convertToLocalDate = useCallback((createdAt?: string) => {
    if (!createdAt) {
      return "N/A"
    }
    return new Date(createdAt).toLocaleString()
  }, [])

  const onClickViewMore = useCallback(async () => {
    setCronHistoryUrl("/api/cron")
  }, [])

  useEffect(() => {
    setJsLocalDate(convertToLocalDate(postedJob?.createdAt))
  }, [convertToLocalDate, postedJob?.createdAt])

  const cronHistories = useMemo(() => {
    if (cronHistoryData) {
      return (
        <ScrollableList
          maxItemsToRender={50}
          listItems={cronHistoryData.map((history) => ({
            id: `${history.createdAt}`,
            content: (
              <span>
                <span>{history.jobName}</span>{" "}
                {convertToLocalDate(`${history.createdAt}`)}
              </span>
            ),
          }))}
        />
      )
    }

    if (cronHistoryError) {
      return (
        <span style={{ color: "red" }}>
          Fetch to {cronHistoryUrl} failed, try again later
        </span>
      )
    }

    if (cronHistoryUrl) {
      return <span>Loading History...</span>
    }
    return <></>
  }, [convertToLocalDate, cronHistoryData, cronHistoryError, cronHistoryUrl])

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
      {!cronHistoryUrl && (
        <Button onClick={onClickViewMore} color="orange">
          View More
        </Button>
      )}
      {cronHistories}
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
