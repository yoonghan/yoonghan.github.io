import React, { useState } from "react";
import SurveyTitle from "./SurveyTitle";
import SurveyDescription from "./SurveyDescription";
import SurveyFixed from "./SurveyFixed";
import SurveyQuestion from "./SurveyQuestion";
import Declaration from "./Declaration";
import Consensus from "./Consensus";
import { useInputValue } from "./hooks";
import Question from "./models/Question";
import ListController from "./controllers/ListController";
import { useAlert } from 'react-alert';


export default function SurveyBuilder() {
  const alert = useAlert();
  const [saveBtnDisabled, setSaveBtnDisabled] = React.useState(false);
  const [title, handleChangeTitle] = useInputValue("New Survey");
  const [description, handleChangeDescription] = useInputValue("This is subject for declaring my travel for MOH of Singapore.");
  const [declaration, handleChangeDeclaration] = useInputValue("I hearby declare that all the information provided are correct and justified.");
  const [consensus, handleChangeConsensus] = useInputValue("I understand that the information provided are for not for public use and it is to confirm with MOH of Singapore as a citizen, visitor, temporary/permanent residence to declare my travel.");
  const [questions, setQuestions] = useState([
    new Question({
      text: "Have you just returned from overseas after 14 days",
      options: ["Yes", "No"]
    })
  ]);
  const listController = new ListController(questions, setQuestions);

  const saveToDatabase = (event) => {
    setSaveBtnDisabled(true);
    fetch("/api/survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({survey: {
        title,
        description,
        declaration,
        consensus,
        questions
      }})
    })
    .then(response => response.json())
    .then(response => {
      alert.success('Form successfully save/updated');
      setSaveBtnDisabled(false);
    })
    .catch((error) => {
      alert.error('Form failed to save');
      setSaveBtnDisabled(false);
    });
  }

  return (
    <div>
      <header className={'container'}>
        <div className={'container-toolbar'}>
          Click "Save" once all changes are ready.
          <button
            className="pure-button pure-button-primary"
            onClick={saveToDatabase}
            disabled={saveBtnDisabled}
            >
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
        <hr/>
        <i>SECTION: Consensus & Declaration</i>
        <Declaration declaration={declaration} handleChangeDeclaration={handleChangeDeclaration} />
        <Consensus consensus={consensus} handleChangeConsensus={handleChangeConsensus} />

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
        hr {
          margin: 3rem 0;
        }
      `}</style>
    </div>
  );
}
