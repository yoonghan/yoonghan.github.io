import React, { useCallback } from "react";

export default function FixedQuestions({questions, values, handleChange}) {
  const _getLabelName = useCallback((name) => {
    switch (name) {
      case "name":
        return "Full Name";
      case "phonenumber":
        return "Contact Phone";
      case "address":
        return "Place Postal Code";
      default:
        return "OOPS, not defined, please check with administrator!!";
    }
  }, [values]);

  const _drawComponent = useCallback((questions) => {
    return questions.map((elem, idx) => (
      <div key={`fq_${idx}`}>
        <label>{_getLabelName(elem)}</label>
        <input
          type="text"
          value={values[elem]}
          name={elem}
          className="w3-input"
          onChange={handleChange} required/>
      </div>
    ));
  }, [values]);

  return (
    <fieldset>
      {_drawComponent(questions)}
    </fieldset>
  )
}
