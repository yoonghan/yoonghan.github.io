import React, { useState } from "react";

export default function SurveyPhone({ phone, handleChangePhone }) {
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
            Save Phone
          </>
        ) : (
          <>
            <i className="fas fa-pen icon" />
            Edit Phone
          </>
        )}
      </button>
      <div className={'innerContainer'}>
        {editing ? (
          <input type="text" value={phone} onChange={handleChangePhone} />
        ) : (
          phone
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
