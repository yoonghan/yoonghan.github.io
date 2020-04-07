import React, {useState} from "react";

export default function SurveyFixed({ question, setQuestion, removeQuestion }) {

  const [checked, setChecked] = useState([]);

  const removeOrAdd = (name) => () => {
    const foundIdx = checked.indexOf(name);

    if(foundIdx > -1) {
      removeQuestion(name);
      checked.splice(foundIdx,1);
      setChecked(checked);
    }
    else {
      setQuestion(name);
      checked.push(name);
      setChecked(checked);
    }
  }

  return (
    <div className={'container'}>
      <label className={"pure-checkbox"}>
        <input
          type="checkbox"
          id={"name"}
          name={"name"}
          value={"name"}
          onClick={removeOrAdd('name')}
        />
        {" Guest name"}
      </label>
      <label className={"pure-checkbox"}>
        <input
          type="checkbox"
          id={"address"}
          name={"address"}
          value={"address"}
          onClick={removeOrAdd('address')}
        />
        {" Postal code"}
      </label>
      <label className={"pure-checkbox"}>
        <input
          type="checkbox"
          id={"phonenumber"}
          name={"phonenumber"}
          value={"phonenumber"}
          onClick={removeOrAdd('phonenumber')}
        />
        {" Phone number"}
      </label>
      <style jsx>{`
        .container {

        }
      `}</style>
    </div>
  );
}
