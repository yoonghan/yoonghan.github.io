import React, { useState } from "react";

export default function SurveyAddress({ address, handleChangeAddress }) {
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
            Save Address
          </>
        ) : (
          <>
            <i className="fas fa-pen icon" />
            Edit Address
          </>
        )}
      </button>
      <p className={'innerContainer'}>
        {editing ? (
          <textarea
            className="pure-input-1-2"
            placeholder="Address"
            value={address}
            onChange={handleChangeAddress}>
          </textarea>
        ) : (
          address
        )}
      </p>
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
