`use strict`

import * as React from "react";
import timeline from "../../public/json/timeline.js";
import {TABLE_HEADER, TABLE_BODY} from "../../shared/style";

const Timeline:React.FC<any> = () => {
  const _createBookListing = ():JSX.Element[] => {
    const bookList = timeline.books;

    return bookList.map(
      (book, idx) => {
        return (
          <tr key={`timeline_book_${idx}`}>
            <td>{book.title}</td>
            <td>{book.learnt}</td>
            <style jsx>{`
              td {
                padding: 1rem 2rem;
                border-top: ${TABLE_BODY.BORDER};
                padding-bottom: 1rem;
              }
              td:first-child {
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
          <th>Book Title</th>
          <th>Learnt</th>
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

export default Timeline;
