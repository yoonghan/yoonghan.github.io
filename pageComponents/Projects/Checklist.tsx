import { usePwaHooks } from "@/components/CommandBar/PwaEnabler/usePwaHooks"
import Table from "@/components/Table"

const TroubleshootPwaCheckList = () => {
  const { isRegistered, isTwaApp, isLatestInstalled, hasLatestUpdate } =
    usePwaHooks(false)

  const changeStatus = (status: boolean) => (status ? "true" : "false")

  const lists: { Property: string; Status: string }[] = [
    {
      Property: "PWA Registered",
      Status: changeStatus(isRegistered),
    },
    {
      Property: "Trusted Site App",
      Status: changeStatus(isTwaApp),
    },
    {
      Property: "Detected New Update?",
      Status: changeStatus(hasLatestUpdate),
    },
    {
      Property: "Update Installed?",
      Status: changeStatus(isLatestInstalled),
    },
  ]

  return (
    <section>
      <h3>PWA</h3>
      <p>Page is pwa compatible.</p>
      <Table headers={["Property", "Status"]} list={lists} />
    </section>
  )
}

export default TroubleshootPwaCheckList
