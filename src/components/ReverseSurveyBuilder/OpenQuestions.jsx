import React, { useMemo, useCallback } from "react";

export const replaceAsName = (text, idx) => {
  return `${idx}-`+text.replace(/\s/g, "_");
}

export const determineInitialValue = (type) => {
  switch (type) {
    case "Short Answer":
    case "Options: Pick Any Number":
      return "";
    case "Options: Pick One":
      return [];
    default:
      return "";
  }
}

export default function OpenQuestions({questions, values, handleChange}) {
  const _drawElement = useCallback((elem, idx) => {
    const {type} = elem;
    switch (type) {
      case "Short Answer":
        return _drawShortAnswer(elem, idx);
      case "Options: Pick Any Number":
        return _drawPickAnyNumber(elem, idx);
      case "Options: Pick One":
        return _drawPickOne(elem, idx);
      default:
        return <div/>;
    }
  }, [values]);

  const _drawPickOne = useCallback((component, componentIdx) => {
    const {text} = component;
    const name = replaceAsName(text, componentIdx);
    return (
      <fieldset>
        <div>{text}</div>
        {component.options.map((value, idx) => (
          <div key={`oq_${componentIdx}_${idx}`}>
            <input className="w3-radio" type="radio" name={name} id={`${name}+${idx}`} value={value}
              onChange={handleChange}
              checked={values[name] === value}
            />
            <label htmlFor={`${name}+${idx}`}>{value}</label>
          </div>
        ))}
      </fieldset>
    )
  }, [values]);

  const _drawPickAnyNumber = useCallback((component, componentIdx) => {
    const {text} = component;
    const name = replaceAsName(text, componentIdx);
    return (
      <fieldset>
        <div>{text}</div>
        {component.options.map((value, idx) => (
          <div key={`oq_${componentIdx}_${idx}`}>
            <input className="w3-check" type="checkbox" name={name} id={`${name}+${idx}`} value={value}
              onChange={handleChange}
              checked={values[name].indexOf(value) > -1}
            />
            <label htmlFor={`${name}+${idx}`}>{value}</label>
          </div>
        ))}
      </fieldset>
    )
  }, [values]);

  const _drawShortAnswer = useCallback((component, componentIdx) => {
    const {text} = component;
    const name = replaceAsName(text, componentIdx);
    return (
      <fieldset>
        <div>{text}</div>
        <input type="text" onChange={handleChange} value={values[name]} name={name} id={name} required/>
      </fieldset>
    );
  }, [values]);

  const _drawComponent = useCallback((values) => {
    return values.map((elem, idx) => (
      <div key={`oq_${idx}`}>
        {_drawElement(elem, idx)}
      </div>
    ));
  }, [values]);

  return (
    <React.Fragment>
      {_drawComponent(questions)}
    </React.Fragment>
  )
}
