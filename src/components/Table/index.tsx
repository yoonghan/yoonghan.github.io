import { ReactNode } from "react"

interface Props {
  list: Array<{ [key: string]: ReactNode }>
  headers: Array<string>
}

const Table = ({ list, headers }: Props) => {
  const renderInfo = (info: { [key: string]: ReactNode }, idx: number) => {
    const arr: Array<JSX.Element> = []
    for (const [key, value] of Object.entries(info)) {
      arr.push(
        <td key={`${key}_${idx}`} className="px-4 py-8">
          {value}
        </td>
      )
    }
    return arr
  }

  const listOfObjects = list.map((info, idx) => {
    return (
      <tr key={`table_${idx}`} className="hover:bg-slate-200">
        {renderInfo(info, idx)}
      </tr>
    )
  })

  return (
    <div className="overflow-x-auto">
      <table className="table-auto bg-white">
        <thead className="text-white bg-slate-800">
          <tr>
            {headers.map((header, idx) => (
              <th key={`table_header_${idx}`} className="px-4 py-8">
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
