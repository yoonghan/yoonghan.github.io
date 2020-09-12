import React, { useState } from "react";
import {useDropzone} from "react-dropzone";

export default function SurveyLogo({ logo, handleChangeLogo, handleChangeLogoForm }) {
  const [editing, setEditing] = useState(false);
  const [file, setFile] = useState("");
  const onDrop = React.useCallback(acceptedFiles => {
    if(acceptedFiles.length !== 1) {
      alert("System supports only single file");
    }

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    handleChangeLogoForm(formData);
    handleChangeLogo(URL.createObjectURL(acceptedFiles[0]));
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  function toggleEditing() {
    setEditing(!editing);
  }

  function drawInput() {
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
        <img src={logo}/>
      </div>
    )
  }

  return (
    <div className={'container'}>
      <button className="pure-button" onClick={toggleEditing}>
        {editing ? (
          <>
            <i className="fas fa-save icon" />
            Save Logo
          </>
        ) : (
          <>
            <i className="fas fa-pen icon" />
            Edit Logo
          </>
        )}
      </button>
      <div className={'innerContainer'}>
        {editing ? (
          drawInput()
        ) : (
          <img src={logo}/>
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .innerContainer {
          flex: 1 0;
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );
}
