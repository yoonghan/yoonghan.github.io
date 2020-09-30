import * as React from 'react';

const Login:React.SFC<any> = ({}) => {
  return (
    <div className="container">
      <div className="login-box-container">
        <form method="GET" action="/twice/locker">
          <fieldset>
            <legend>Sign in</legend>
            <div className="form-container">
              <input type="text" placeholder="username" id="username"></input>

              <input type="password" placeholder="password" id="password"></input>

              <input type="submit" value="Login"></input>
            </div>
          </fieldset>
        </form>
      </div>
      <style jsx>{`
          .container {

          }
          .login-box-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 2rem;
            border: 1px solid;
          }
          .form-container {
            display: flex;
            flex-direction: column;
            min-width: 320px;
          }
          .form-container > input {
            padding: 1rem;
            margin-top: 2rem;
          }
      `}</style>
    </div>
  );
};

export default Login;
