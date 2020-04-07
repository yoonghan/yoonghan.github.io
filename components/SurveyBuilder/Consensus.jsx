import React, { useState } from "react";

export default function SurveyTitle({ consensus, handleChangeConsensus }) {
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
            Save Consensus
          </>
        ) : (
          <>
            <i className="fas fa-pen icon" />
            Edit Consensus
          </>
        )}
      </button>
      <p className={'innerContainer'}>
        {editing ? (
          <textarea
            className="pure-input-1-2"
            placeholder="Information that user agrees to the form upon submission"
            value={consensus}
            onChange={handleChangeConsensus}>
          </textarea>
        ) : (
          consensus
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
        .pure-input-1-2 {
          width: 80%;
          height: 10rem;
        }
      `}</style>
    </div>
  );
}
