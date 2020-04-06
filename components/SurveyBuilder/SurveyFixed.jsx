import React from "react";

export default function SurveyFixed({ }) {

  return (
    <div className={'container'}>
      <label className={"pure-checkbox"}>
        <input
          type="checkbox"
          id={"name"}
          name={"name"}
          value={"name"}
        />
        {" Guest name"}
      </label>
      <label className={"pure-checkbox"}>
        <input
          type="checkbox"
          id={"address"}
          name={"address"}
          value={"address"}
        />
        {" Postal code"}
      </label>
      <label className={"pure-checkbox"}>
        <input
          type="checkbox"
          id={"phonenumber"}
          name={"phonenumber"}
          value={"phonenumber"}
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
