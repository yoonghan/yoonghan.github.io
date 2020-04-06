import React, { useState } from "react";

export default function SurveyTitle({ title, handleChangeTitle }) {
  const [editing, setEditing] = useState(false);

  function toggleEditing() {
    setEditing(!editing);
  }

  return (
    <div className={'container'}>
      <button className="pure-button" onClick={toggleEditing}>
        {editing ? (
          <>
            <i className="fas fa-save icon" />
            Save Title
          </>
        ) : (
          <>
            <i className="fas fa-pen icon" />
            Edit Title
          </>
        )}
      </button>
      <h2 className={'innerContainer'}>
        {editing ? (
          <input type="text" value={title} onChange={handleChangeTitle} />
        ) : (
          title
        )}
      </h2>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .innerContainer {
          flex: 1 0;
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );
}
