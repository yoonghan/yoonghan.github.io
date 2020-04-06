import React, { useState } from "react";
import SurveyTitle from "./SurveyTitle";
import SurveyDescription from "./SurveyDescription";
import SurveyFixed from "./SurveyFixed";
import SurveyQuestion from "./SurveyQuestion";
import { useInputValue } from "./hooks";
import Question from "./models/Question";
import ListController from "./controllers/ListController";

export default function SurveyBuilder() {
  const [title, handleChangeTitle] = useInputValue("New Survey");
  const [description, handleChangeDescription] = useInputValue("Explain the purpose of collecting input");
  const [questions, setQuestions] = useState([
    new Question({
      text: "Have you just returned from overseas after 14 days",
      options: ["Yes", "No"]
    })
  ]);

  const listController = new ListController(questions, setQuestions);

  return (
    <div>
      <header className={'container'}>
        <div className={'container-toolbar'}>
          Click "Save" once all changes are ready.
          <button className="pure-button pure-button-primary">
            Save
          </button>
        </div>
      </header>
      <br/>
      <form className="pure-form" onSubmit={(e)=>{e.preventDefault(); return false}}>
        <i>SECTION: Survey title</i>
        <SurveyTitle title={title} handleChangeTitle={handleChangeTitle} />
        <hr/>
        <i>SECTION: Survey description</i>
        <SurveyDescription description={description} handleChangeDescription={handleChangeDescription} />
        <hr/>
        <i>SECTION: *Required User particulars</i>
        <SurveyFixed/>
        <hr/>
        <i>SECTION: Open Questionaires</i>
        <ol>
          {questions.map((question, i) => (
            <SurveyQuestion
              key={question.id}
              question={question}
              setQuestion={question => listController.set(i, question)}
              removeQuestion={() => listController.remove(i)}
              moveQuestionUp={() => listController.moveUp(i)}
              moveQuestionDown={() => listController.moveDown(i)}
            />
          ))}
        </ol>
        <button onClick={() => listController.add(new Question())} className="pure-button">
          <i className="fas fa-plus icon" />
          Add Question
        </button>
      </form>
      <footer/>
      <style jsx>{`
        .pure-form {
          margin: 10px;
        }
        .container {
          padding-top: 150px;
        }
        .container-toolbar {
          padding: 2rem 0;
          background: rgba(210, 210, 210, 0.9);
          box-shadow: 5px 5px 10px 5px;
          width: 100%;
          position: fixed;
          display: flex;
          top: 0;
          justify-content: space-evenly;
        }
        i {
          text-decoration: underline;
        }
        footer {
          margin-bottom: 20rem;
        }
      `}</style>
    </div>
  );
}
