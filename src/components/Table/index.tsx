import { ReactNode } from "react"

type ListRecord = Record<string, ReactNode>

interface Props {
  list: Array<ListRecord>
  headers: Array<string>
  onClick?: (key: Record<string, ReactNode>) => void
}

const Table = ({ list, headers, onClick }: Props) => {
  const renderInfo = (info: { [key: string]: ReactNode }, idx: number) => {
    const arr: Array<JSX.Element> = []
    for (const [key, value] of Object.entries(info)) {
      arr.push(
        <td key={`${key}_${idx}`} className="p-2 border border-black">
          {value}
        </td>
      )
    }
    return arr
  }

  const listOfObjects = list.map((info, idx) => {
    return (
      <tr
        key={`table_${idx}`}
        className="hover:bg-slate-200"
        onClick={onClick && (() => onClick(info))}
      >
        {renderInfo(info, idx)}
      </tr>
    )
  })

  return (
    <div className="overflow-x-auto">
      <table className="table-auto bg-white border-collapse">
        <thead className="text-white bg-slate-800">
          <tr>
            {headers.map((header, idx) => (
              <th
                key={`table_header_${idx}`}
                className="p-2 border border-black"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{listOfObjects}</tbody>
      </table>
    </div>
  )
}

export default Table
