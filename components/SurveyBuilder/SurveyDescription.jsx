import React, { useState } from "react";

export default function SurveyDescription({ description, handleChangeDescription }) {
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
            Save Description
          </>
        ) : (
          <>
            <i className="fas fa-pen icon" />
            Edit Description
          </>
        )}
      </button>
      <p className={'innerContainer'}>
        {editing ? (
          <textarea
            class="pure-input-1-2"
            placeholder="Description to user why this is needed"
            value={description}
            onChange={handleChangeDescription}>
          </textarea>
        ) : (
          description
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
