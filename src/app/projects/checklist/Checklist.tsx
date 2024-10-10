"use client"

import Button from "@/components/Button"
import { usePwaHooks } from "@/components/CommandBar/PwaEnabler/usePwaHooks"
import ScrollableList from "@/components/ScrollableList"
import Table from "@/components/Table"
import { site } from "@/config/site"
import { CronJob } from "@/types/cron"
import { ReactNode, useCallback, useMemo, useState } from "react"
import { useFetch } from "usehooks-ts"

const apiUrl = `${site.apiUrl}/cron`

const CronJobCheckList = ({
  latestDeployedCronMessage,
  queryTodayCron,
}: {
  latestDeployedCronMessage?: string
  queryTodayCron?: boolean
}) => {
  const [cronHistoryUrl, setCronHistoryUrl] = useState<string | undefined>()
  const { error: cronHistoryError, data: cronHistoryData } =
    useFetch<CronJob[]>(cronHistoryUrl)
  const { data: latestCron } = useFetch<any>(
    queryTodayCron ? site.cronApiUrl : undefined
  )

  const convertToLocalDate = useCallback((createdAt?: string) => {
    if (!createdAt) {
      return "N/A"
    }
    return new Date(createdAt).toLocaleString()
  }, [])

  const onClickViewMore = useCallback(async () => {
    setCronHistoryUrl(apiUrl)
  }, [])

  const cronHistories = useMemo(() => {
    if (cronHistoryData) {
      return (
        <ScrollableList
          maxItemsToRender={50}
          listItems={cronHistoryData.map((history) => ({
            id: `${history.id}`,
            content: (
              <span>
                <span>{history.source}</span>{" "}
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
      return <span>Loading data...</span>
    }
    return <></>
  }, [convertToLocalDate, cronHistoryData, cronHistoryError, cronHistoryUrl])

  const isDateValid = useCallback(
    (date: string) => date === "N/A" || date === "Invalid Date",
    []
  )

  const generateCronTable = useCallback(
    (
      checksTitle: string,
      message: string | undefined
    ): {
      Checks: string
      Active: ReactNode
      Message: ReactNode
    } => {
      const date = convertToLocalDate(message)
      const str = date.split(",")
      return {
        Checks: checksTitle,
        Active: (
          <span data-testid={`result ${checksTitle}`}>
            {isDateValid(date) ? "False" : "True"}
          </span>
        ),
        Message: (
          <>
            <span data-testid={`message ${checksTitle}`}>
              {isDateValid(date) ? "Cron execution pending" : str[0]}
            </span>
            <span>{str[1]}</span>
          </>
        ),
      }
    },
    [convertToLocalDate]
  )

  return (
    <section>
      <h3>CronJob</h3>
      <p>Check Cron job has executed.</p>
      <Table
        headers={["Checks", "Active", "Message"]}
        list={[
          generateCronTable("Since Deployment", latestDeployedCronMessage),
          ...(queryTodayCron
            ? [generateCronTable("Today's Run", latestCron?.message)]
            : []),
        ]}
        className="text-black"
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
      <Table
        headers={["Property", "Status"]}
        list={lists}
        className="text-black"
      />
      <div>
        <small>N/T = Not tested, </small>
        <small>N/R = Not reliable </small>
      </div>
    </section>
  )
}

export { CronJobCheckList }
