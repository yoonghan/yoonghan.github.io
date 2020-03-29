import * as React from "react";
import Head from 'next/head';
import HeaderOne from "../../components/HeaderOne";
import Footer from "../../components/Footer";
import { Formik } from 'formik';

interface StatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: () => Promise<P>
}

const FormFill: StatelessPage<any> = () => {

  React.useEffect(()=>{
  },[]);


  // const submit = (onSubmitCallback: any) => {
  //
  //   if(shouldUpload) {
  //     const formData = new FormData();
  //     formData.append("file", acceptedFiles[0]);
  //
  //     onSubmitCallback(synthensizedEvent, `Uploading file ${acceptedFiles[0].name}...`, ENUM_DISPLAY_TYPE.SYSTEM);
  //
  //     fetch('/api/firebase', {
  //       method: 'POST',
  //       body: formData
  //     })
  //     .then(resp => (resp.json()))
  //     .then(data => {
  //       if(data.status === "ok") {
  //         onSubmitCallback(synthensizedEvent, data.data, ENUM_DISPLAY_TYPE.MESSAGE);
  //       }
  //       else {
  //         onSubmitCallback(synthensizedEvent, "[File Sent failed]", ENUM_DISPLAY_TYPE.SYSTEM);
  //       }
  //     });
  //   }
  // }

  return (
    <React.Fragment>
      <Head>
        <title>Form Fill</title>
        <link rel="stylesheet" href="/static/css/common.css"/>
        <link rel="stylesheet" href="/static/css/w3c.css"/>
        <style>{`
          html {
            font-size: 14pt;
          }
        `}</style>
      </Head>
      <HeaderOne title={"Project Doctor x"} isLined={true}/>
      <Formik
            initialValues={{ been: '', lucky: '' }}
            validate={values => {
              const errors = {};
              if (values.been === '') {
                errors["been"] = 'Required';
              }
              if (values.lucky === '') {
                errors["lucky"] = 'Required';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              // touched,
              handleChange,
              // handleBlur,
              handleSubmit,
              // isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="w3-padding w3-card-4">
                <div>Have you been overseas for this past 14 days:</div>
                {
                  errors.been && <p className="w3-text-red">Do not leave me empty</p>
                }
                <div>
                  <p>
                    <input className="w3-radio" type="radio" name="been" value="no"
                      onChange={handleChange}
                      checked={values.been === 'no'}
                    />
                    <label>No</label>
                  </p>
                  <p>
                    <input className="w3-radio" type="radio" name="been" value="yes"
                      onChange={handleChange}
                      checked={values.been === 'yes'}
                    />
                    <label>Yes</label>
                  </p>
                </div>
                <hr/>
                <div>Do you feel lucky ?</div>
                {
                  errors.lucky && <p className="w3-text-red">Do not leave me empty</p>
                }
                <div>
                  <p>
                    <input className="w3-radio" type="radio" name="lucky" value="no"
                      onChange={handleChange}
                      checked={values.lucky === 'no'}
                     />
                    <label>No</label>
                  </p>
                  <p>
                    <input className="w3-radio" type="radio" name="lucky" value="yes"
                      onChange={handleChange}
                      checked={values.lucky === 'yes'}
                    />
                    <label>Yes</label>
                  </p>
                </div>

                <hr/>
                <button type="submit">Submit</button>
              </form>
            )}
      </Formik>
      <Footer/>
    </React.Fragment>
  );
}

export default FormFill;
