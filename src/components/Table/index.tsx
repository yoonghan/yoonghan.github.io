import { CSSProperties, ReactNode } from "react"

type ListRecord = Record<string, ReactNode>

interface Props {
  list: Array<ListRecord>
  headers: Array<string>
  onClick?: (key: Record<string, ReactNode>) => void
  className?: string
}

const Table = ({ list, headers, onClick, className }: Props) => {
  const renderInfo = (info: { [key: string]: ReactNode }, idx: number) => {
    const arr: Array<JSX.Element> = []
    for (const [key, value] of Object.entries(info)) {
      arr.push(
        <td key={`${key}-${idx}`} className="p-2 border border-black">
          {value}
        </td>
      )
    }
    return arr
  }

  const listOfObjects = list.map((info, idx) => {
    const key = Object.keys(info).reduce((acc, x) => `${acc}-${x}`, "")
    return (
      <tr
        key={`${key}-${idx}`}
        className="hover:bg-slate-200"
        onClick={onClick && (() => onClick(info))}
      >
        {renderInfo(info, idx)}
      </tr>
    )
  })

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="table-auto border-collapse">
        <thead className="text-white bg-slate-800">
          <tr>
            {headers.map((header) => (
              <th key={header} className="p-2 border border-black">
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
