import React from "react"
import styles from "./Table.module.css"

interface Props {
  list: Array<{ [key: string]: string }>
  headers: Array<string>
}

const Table = ({ list, headers }: Props) => {
  const renderInfo = (info: { [key: string]: string }, idx: number) => {
    const arr: Array<JSX.Element> = []
    for (const [key, value] of Object.entries(info)) {
      arr.push(<td key={`${key}_${idx}`}>{value}</td>)
    }
    return arr
  }

  const listOfObjects = list.map((info, idx) => {
    return <tr key={`table_${idx}`}>{renderInfo(info, idx)}</tr>
  })

  return (
    <table className={styles.container}>
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={`table_header_${idx}`}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{listOfObjects}</tbody>
    </table>
  )
}

export default Table
