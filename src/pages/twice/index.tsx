import {SFC, useState, useEffect, useMemo} from 'react';
import { GetServerSideProps } from 'next';
import globalStyles from '../../shared/style';

enum EnumSelection {
  LOCK,
  ORDER
}

const Index:SFC<any> = ({backendServer}) => {
  const [ready, updateReady] = useState(false);
  const [retryCounter, setRetryCounter] = useState(0);
  const [selection, setSelection] = useState(EnumSelection.ORDER);

  const retryWaitInterval = 5000;
  const allowedRetries = 5;

  const _doMonitorCheck = () => {
    fetch(`${backendServer}/api/monitor`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer'
    })
    .then(resp => (resp.json()))
    .then(resp => { updateReady(resp.status === 'ok') })
    .catch(err => { updateReady(false)})
    .finally(() => {
      setRetryCounter(retryCounter + 1);
    })
  }

  useEffect(() => {
    if(!ready && retryCounter < allowedRetries) {
      setTimeout(_doMonitorCheck, retryWaitInterval)
    }
  }, [retryCounter, ready]);

  const _drawnLockDialog = useMemo(() => (
    <form method="GET" action="/twice/locker">
      <fieldset disabled={!ready}>
        <legend>Sign in for Lock</legend>
        <div className="form-container">
          <input type="text" placeholder="username" id="username"></input>

          <input type="password" placeholder="password" id="password"></input>

          <input type="submit" value="Login"></input>
        </div>
      </fieldset>
      <style jsx>{`
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
    </form>
  ),[ready])

  const _drawnOrderDialog = useMemo(() => (
    <form method="GET" action="/twice/order">
      <fieldset disabled={!ready}>
        <legend>Sign in for Order</legend>
        <div className="form-container">
          <input type="text" placeholder="username" id="username"></input>
          <input type="password" placeholder="password" id="password"></input>
          <input type="submit" value="Login"></input>
        </div>
      </fieldset>
      <style jsx>{`
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
    </form>
  ),[ready])

  const _drawnDialog = useMemo(() => {
    switch(selection) {
      case EnumSelection.LOCK:
        return _drawnLockDialog
      break;
      case EnumSelection.ORDER:
        return _drawnOrderDialog
      break;
      default:
        return <>OOPS</>
    }
  }, [selection, ready]);

  const _drawnMessage = useMemo(() => {
    if(ready) {
      return <span>Ready, and do login</span>
    }

    if(retryCounter < allowedRetries) {
      return <span><em className="animate-blink">PLEASE WAIT: </em> Warming up and getting server ready.</span>
    }
    else {
      return (
        <span>
          <em className="text-red">ERROR: </em> Exhausted retry, maybe a refresh may help.
          <style jsx>{`
              .text-red {
                color: #f56565;
              }
          `}</style>
        </span>
      )
    }
  }, [retryCounter, ready])

  return (
    <div className="container">
      <div className="login-box-container">
        {_drawnMessage}
        <section>
          {

          }
          <div className={'selector-container'}>
            {selection === EnumSelection.LOCK && <div onClick={()=> setSelection(EnumSelection.ORDER)}>Change to Order Login</div>}
            {selection === EnumSelection.ORDER && <div onClick={()=> setSelection(EnumSelection.LOCK)}>Change to Lock Login</div>}
          </div>
          {_drawnDialog}
        </section>
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
          .selector-container {
            padding: 2rem;
            display: flex;
            cursor: pointer;
            text-decoration: underline;
            justify-content: center;
          }
      `}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    BACKEND_SERVER
  } = process.env;

  return {
    props: {
      backendServer: BACKEND_SERVER
    }
  }
}

export default Index;
