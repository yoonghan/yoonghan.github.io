`use strict`

import * as React from "react";
import {TABLE_HEADER, TABLE_BODY} from "../../shared/style";

interface ITable {
  list: Array<Object>;
  headers: Array<String>;
}

const Table:React.FC<ITable> = ({list, headers}) => {
  const _drawInfo = (info:any, idx:number) => {
    const arr:Array<JSX.Element> = [];
    for (const [key, value] of Object.entries(info)) {
      arr.push(<td key={`${key}_${idx}`}>{(value as string)}</td>)
    }
    return arr;
  }

  const _createBookListing = ():JSX.Element[] => {
    return list.map(
      (info, idx) => {
        return (
          <tr key={`table_${idx}`}>
            {_drawInfo(info, idx)}
            <style jsx>{`
              tr > :global(td) {
                padding: 1rem 2rem;
                border-top: ${TABLE_BODY.BORDER};
                padding-bottom: 1rem;
              }
              tr > :global(td:first-child) {
                padding-right: 10px;
              }
              tr {
                color: ${TABLE_BODY.FOREGROUND};
                background-color: ${TABLE_BODY.BACKGROUND};
              }
              tr:hover {
                background-color: ${TABLE_BODY.HOVER_BACKGROUND};
              }
            `}</style>
          </tr>
        );
    });
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, idx) => <th key={`table_header_${idx}`}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {_createBookListing()}
      </tbody>
      <style jsx>{`
        thead th {
          color: ${TABLE_HEADER.FOREGROUND};
          background-color: ${TABLE_HEADER.BACKGROUND};
        }
        tbody th {
          padding: 1rem 2rem;
          border-top: ${TABLE_BODY.BORDER};
          padding-bottom: 1rem;
        }
      `}</style>
    </table>
  );
}

export default Table;
