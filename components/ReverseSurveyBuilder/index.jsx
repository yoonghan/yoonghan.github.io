import React, { useState, useCallback, useMemo } from "react";
import { Formik } from 'formik';
import FixedQuestions from "./FixedQuestions";
import OpenQuestions, {replaceAsName, determineInitialValue} from "./OpenQuestions";
import Declaration from "./Declaration";

const _showError = (errors) => {
  let counter = 0;
  const messageArr = [];
  for(let error in errors) {
    const errorMessage = `${error.toUpperCase().replace(/_/g, " ")} must be ${errors[error]}`;
    messageArr.push(<li key={`err_${counter}`}>{errorMessage}</li>);
    counter++;
  }
  return messageArr;
}

export default function SurveyBuilder(props) {
  const {
    title,
    description,
    consensus,
    declaration,
    fixedQuestions,
    questions,
    handleSubmit,
    name,
    mobileno,
    address} = props;

  const setDefaultValue = (str) => {
    switch(str) {
      case "name":
        return name;
      case "phonenumber":
        return mobileno;
      case "address":
        return address;
      default:
        return '';
    }
  }

  const _initialValue = useCallback(() => {
    const initObj = { consensus: [], declaration: [] };
    if(fixedQuestions) {
      for(let i = 0; i<fixedQuestions.length; i++) {
        initObj[fixedQuestions[i]] = setDefaultValue(fixedQuestions[i]);
      }
    }
    for(let i = 0; i<questions.length; i++) {
      const {text, type} = questions[i];
      initObj[replaceAsName(text, i)] = determineInitialValue(type);
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
          window.scrollTo(0,0);
        }
        return errors;
      }}
      onSubmit={(values) => {
        handleSubmit(values);
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
          {fixedQuestions && <FixedQuestions questions = {fixedQuestions} handleChange={handleChange} values={values}/>}
          <hr/>
          <OpenQuestions questions = {questions} handleChange={handleChange} values={values}/>
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
