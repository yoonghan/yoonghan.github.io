import React, { useState } from "react";

export default function Declaration({declaration, consensus, handleChange, values, errors}) {
  return (
    <fieldset>
      <div>
        <input className="w3-check" type="checkbox" name="consensus" id="consensus" value="yes"
          onChange={handleChange}
          checked={values.consensus.length===1}
        />
        <label htmlFor="been_no">{consensus}</label>
      </div>
      <div>
        <input className="w3-check" type="checkbox" name="declaration" id="declaration" value="yes"
          onChange={handleChange}
          checked={values.declaration.length===1}
        />
        <label htmlFor="been_no">{declaration}</label>
      </div>
    </fieldset>
  );
}
