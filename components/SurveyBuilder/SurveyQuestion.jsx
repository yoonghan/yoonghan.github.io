import React, { useState } from "react";
import QuestionForm from "./QuestionForm";

export default function SurveyQuestion({
  question,
  setQuestion,
  removeQuestion,
  moveQuestionUp,
  moveQuestionDown
}) {
  const [editing, setEditing] = useState(false);

  function toggleEditing() {
    setEditing(!editing);
  }

  return (
    <li className={'questionfield-container'}>
      {editing ? (
        <QuestionForm question={question} setQuestion={setQuestion} />
      ) : (
        <>
          <p>{question.text}</p>
          {question.hasOptions ? (
            question.options.map((option, i) => (
              <label key={i} className={question.inputType==="radio" ? "pure-radio":"pure-checkbox"}>
                <input
                  type={question.inputType}
                  id={option}
                  name={option}
                  value={option}
                  disabled
                />
                {" " + option}
              </label>
            ))
          ) : (
            <textarea disabled />
          )}
        </>
      )}
      <button className="pure-button" onClick={toggleEditing}>
        {editing ? (
          <>
            <i className="fas fa-save icon" />
            Save Question
          </>
        ) : (
          <>
            <i className="fas fa-pen icon" />
            Edit Question
          </>
        )}
      </button>
      <button className="pure-button" onClick={removeQuestion}>
        <i className="fas fa-trash-alt icon" />
        Delete Question
      </button>
      <br />
      Move Question:{" "}
      <button className="pure-button" onClick={moveQuestionUp}>
        <i className="fas fa-angle-up icon" />
        Up
      </button>
      <button className="pure-button" onClick={moveQuestionDown}>
        <i className="fas fa-angle-down icon" />
        Down
      </button>
      <style jsx>{`
        .questionfield-container{
          margin-top: 1em;
          border-top: #ddd solid 1.5px
          padding-bottom: 1.5em;
        }
        button {
          margin: 0.3em;
        }
      `}</style>
    </li>
  );
}
