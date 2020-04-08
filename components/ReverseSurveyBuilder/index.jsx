import React, { useState, useCallback } from "react";
import { Formik } from 'formik';
import FixedQuestions from "./FixedQuestions";
import Declaration from "./Declaration";

/**
const onSubmit = (name:string, mobileno:string, been:string, lucky:string) => {
  const data = JSON.stringify({
    name: name,
    mobileno: mobileno,
    question1: been,
    question2: lucky
  });
  setStatus(enumStatuses.SUBMITTING);
  fetch("/api/database", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({data: data})
  })
  .then(response => response.json())
  .then(response => {
    console.log(response);
    setStatus(enumStatuses.SUCCESS);
  })
  .catch((error) => {
    console.log(error);
    setStatus(enumStatuses.FAIL);
  });
}
**/

const _showError = (errors) => {
  let counter = 0;
  const messageArr = [];
  for(let error in errors) {
    const errorMessage = `${error.toUpperCase()} must be ${errors[error]}`;
    messageArr.push(<li key={`err_${counter}`}>{errorMessage}</li>);
    counter++;
  }
  return messageArr;
}

export default function SurveyBuilder(props) {
  const {title, description, consensus, declaration, fixedQuestions} = props;

  const _initialValue = useCallback(() => {
    const initObj = { consensus: [], declaration: []};
    for(let i = 0; i<fixedQuestions.length; i++) {
      initObj[fixedQuestions[i]] = '';
    }
    return initObj;
  }, []);

  const _drawErrorComponent = (errors) => {
    return (
      <>
        <div className="w3-card w3-pale-red w3-padding">
          <strong className="w3-text-red">Errors</strong>
          <ul className="w3-text-red">
            {_showError(errors)}
          </ul>
        </div>
        <hr/>
      </>
    );
  }

  const initValues = _initialValue();

  return (
    <Formik
      initialValues={initValues}
      validateOnChange={false}
      validateOnBlur={false}
      validate={values => {
        const errors = {};
        for(let elem in initValues) {
          if(values[elem].trim && values[elem].trim === '') {
            errors[elem] = 'filled';
          }
          else if(values[elem].length === 0) {
            errors[elem] = 'checked';
          }
        }
        return errors;
      }}
      onSubmit={(values) => {
        //onSubmit(values.consensus, values.declaration);
      }}
    >
    {({
      values,
      errors,
      handleChange,
      handleSubmit
    }) => (
      <React.Fragment>
        <h2>{title}</h2>
        <p>{description}</p>
        <form onSubmit={handleSubmit} className="w3-padding w3-card-4">
          {
            (Object.keys(errors).length !== 0 || errors.constructor !== Object) && _drawErrorComponent(errors)
          }
          <FixedQuestions questions = {fixedQuestions} handleChange={handleChange} values={values}/>
          <hr/>
          <Declaration declaration={declaration} consensus={consensus} handleChange={handleChange} values={values}/>
          <hr/>
          <button type="submit">Submit</button>
        </form>
      </React.Fragment>
    )}
    </Formik>
  )
}
