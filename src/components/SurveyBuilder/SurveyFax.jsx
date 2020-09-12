import React, { useState } from "react";

export default function SurveyFax({ fax, handleChangeFax }) {
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
            Save Fax
          </>
        ) : (
          <>
            <i className="fas fa-pen icon" />
            Edit Fax
          </>
        )}
      </button>
      <div className={'innerContainer'}>
        {editing ? (
          <input type="text" value={fax} onChange={handleChangeFax} />
        ) : (
          fax
        )}
      </div>
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
