import React, { useState } from "react";
import { Formik } from 'formik';

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


export default function SurveyBuilder({title, description, consensus, declaration}) {
  return (
    <Formik
      initialValues={{ consensus: [], declaration: [] }}
      validateOnChange={false}
      validateOnBlur={false}
      validate={values => {
        console.log(values);
        const errors = {};
        if (values.consensus.length === 0) {
          errors["consensus"] = 'Required';
        }
        if (values.declaration.length === 0) {
          errors["declaration"] = 'Required';
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
            (errors.consensus || errors.declaration) && <p className="w3-text-red">You need to accept the declaration</p>
          }
          <fieldset>
            <input className="w3-check" type="checkbox" name="consensus" id="consensus" value="yes"
              onChange={handleChange}
              checked={values.consensus.length===1}
            />
            <label htmlFor="been_no">{consensus}</label>
          </fieldset>
          <fieldset>
            <input className="w3-check" type="checkbox" name="declaration" id="declaration" value="yes"
              onChange={handleChange}
              checked={values.declaration.length===1}
            />
            <label htmlFor="been_no">{declaration}</label>
          </fieldset>
          <hr/>
          <button type="submit">Submit</button>
        </form>
      </React.Fragment>
    )}
    </Formik>
  )
}
