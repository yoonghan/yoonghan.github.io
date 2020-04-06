import React, { useState } from "react";
import Question from "./models/Question";
import ListController from "./controllers/ListController";

export default function QuestionForm({ question, setQuestion }) {
  function handleChangeText(e) {
    setQuestion(question.merge({ text: e.target.value }));
  }

  function handleChangeType(e) {
    setQuestion(question.merge({ type: e.target.value }));
  }

  function setOptions(options) {
    setQuestion(question.merge({ options }));
  }

  const listController = new ListController(question.options, setOptions);

  return (
    <div>
      <label>Question Text:</label>
      <input type="text" value={question.text} onChange={handleChangeText} />

      <label htmlFor="question-type">Question Type:</label>
      <select
        id="question-type"
        value={question.type}
        onChange={handleChangeType}
      >
        {Object.values(Question.TYPES).map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {question.hasOptions && (
        <fieldset>
          <legend>Options</legend>

          {question.options.map((option, i) => (
            <div className={'option-container'} key={i}>
              <input
                type="text"
                placeholder="Enter option"
                name={option}
                value={option}
                onChange={e => listController.set(i, e.target.value)}
              />
              <div className={'buttons-container'}>
                <button className="pure-button" onClick={() => listController.moveUp(i)}>
                  <i className="fas fa-angle-up" />
                </button>
                <button className="pure-button" onClick={() => listController.moveDown(i)}>
                  <i className="fas fa-angle-down" />
                </button>
                <button className="pure-button" onClick={() => listController.remove(i)}>
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
            </div>
          ))}
          <p>
            <button className="pure-button" onClick={() => listController.add("")}>
              <i className="fas fa-plus icon" />
              Add Option
            </button>
          </p>

          <style jsx>{`
            .option-container{
              display: flex
            }
            .buttons-container {
              display: flex;
              justify-content: flex-end;
            }
            button {
              background: none;
              color: #0366ee;
              margin-left: 0.2em;
            }
          `}</style>
        </fieldset>
      )}
    </div>
  );
}
