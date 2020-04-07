import React, { useState } from "react";

export default function SurveyTitle({ declaration, handleChangeDeclaration }) {
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
            Save Declaration
          </>
        ) : (
          <>
            <i className="fas fa-pen icon" />
            Edit Declaration
          </>
        )}
      </button>
      <p className={'innerContainer'}>
        {editing ? (
          <textarea
            className="pure-input-1-2"
            placeholder="Information why user needs to sign this form"
            value={declaration}
            onChange={handleChangeDeclaration}>
          </textarea>
        ) : (
          declaration
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
