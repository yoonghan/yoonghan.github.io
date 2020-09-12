import React, { useState } from "react";
import SurveyTitle from "./SurveyTitle";
import SurveyDescription from "./SurveyDescription";
import SurveyAddress from "./SurveyAddress";
import SurveyLogo from "./SurveyLogo";
import SurveyPhone from "./SurveyPhone";
import SurveyFax from "./SurveyFax";
import SurveyFixed from "./SurveyFixed";
import SurveyQuestion from "./SurveyQuestion";
import Declaration from "./Declaration";
import Consensus from "./Consensus";
import { useInputValue, useFileValue } from "./hooks";
import Question from "./models/Question";
import ListController from "./controllers/ListController";
import { useAlert } from 'react-alert';

const writeAsJson = (questions) => {
  const init = {};
  return questions.map((question) => {
    return {
      text: question.text,
      type: question.type,
      options: question.options
    }
  });
}

export default function SurveyBuilder() {
  const alert = useAlert();
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(false);
  const [title, handleChangeTitle] = useInputValue("New Survey");
  const [description, handleChangeDescription] = useInputValue("This is subject for declaring my travel for MOH of Singapore.");
  const [address, handleChangeAddress] = useInputValue("Address");
  const [logo, handleChangeLogo] = useFileValue("Logo");
  const [logoForm, handleChangeLogoForm] = useFileValue("");
  const [phone, handleChangePhone] = useInputValue("Phone");
  const [fax, handleChangeFax] = useInputValue("Fax");
  const [declaration, handleChangeDeclaration] = useInputValue("I hearby declare that all the information provided are correct and justified.");
  const [consensus, handleChangeConsensus] = useInputValue("I understand that the information provided are for not for public use and it is to confirm with MOH of Singapore as a citizen, visitor, temporary/permanent residence to declare my travel.");
  const [fixedQuestions, setFixedQuestions] = useState([]);
  const [questions, setQuestions] = useState([
    new Question({
      text: "Have you just returned from overseas after 14 days",
      options: ["Yes", "No"]
    })
  ]);
  const listQuestionController = new ListController(questions, setQuestions);
  const listFixedQuestionController = new ListController(fixedQuestions, setFixedQuestions);

  const saveToDatabase = (event) => {
    if(logoForm === "") {
      alert.error('Attach Logo');
      setSaveBtnDisabled(false);
      return;
    }
    setSaveBtnDisabled(true);
    const jsonQuestion = writeAsJson(questions);
    fetch('/api/firebase', {
      method: 'POST',
      body: logoForm
    })
    .then(imgResp => (imgResp.json()))
    .then(imgResp => {
      const imgLocation= imgResp.data;
      fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({survey: {
          title,
          description,
          address,
          phone,
          fax,
          declaration,
          consensus,
          fixedQuestions,
          imgLocation,
          questions: jsonQuestion
        }})
      })
      .then(response => response.json())
      .then(response => {
        alert.success('Form successfully save/updated');
        setSaveBtnDisabled(false);
      })
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
        <i>SECTION: Logo</i>
        <SurveyLogo logo={logo} handleChangeLogo={handleChangeLogo} handleChangeLogoForm={handleChangeLogoForm}/>
        <hr/>
        <i>SECTION: Survey address</i>
        <SurveyAddress address={address} handleChangeAddress={handleChangeAddress} />
        <hr/>
        <i>SECTION: Survey Phone</i>
        <SurveyPhone phone={phone} handleChangePhone={handleChangePhone} />
        <hr/>
        <i>SECTION: Survey Fax</i>
        <SurveyFax fax={fax} handleChangeFax={handleChangeFax} />
        <hr/>
        <i>SECTION: *Required User particulars</i>
        <SurveyFixed
          question={fixedQuestions}
          setQuestion={(question) => listFixedQuestionController.add(question)}
          removeQuestion={(question) => listFixedQuestionController.removeByValue(question)}
          />
        <hr/>
        <i>SECTION: Open Questionaires</i>
        <ol>
          {questions.map((question, i) => (
            <SurveyQuestion
              key={question.id}
              question={question}
              setQuestion={question => listQuestionController.set(i, question)}
              removeQuestion={() => listQuestionController.remove(i)}
              moveQuestionUp={() => listQuestionController.moveUp(i)}
              moveQuestionDown={() => listQuestionController.moveDown(i)}
            />
          ))}
        </ol>
        <button onClick={() => listQuestionController.add(new Question())} className="pure-button">
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
