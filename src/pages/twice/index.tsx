import {SFC, useState, useEffect, useMemo} from 'react';
import { GetServerSideProps } from 'next';

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

  const _runServerCheck = () => {
  }

  useEffect(() => {
    if(!ready && retryCounter < allowedRetries) {
      setTimeout(_doMonitorCheck, retryWaitInterval)
    }
  }, [retryCounter, ready]);

  useEffect(() => {
    _doMonitorCheck()
  }, []);

  const _changeTo = (select:EnumSelection) => {
    console.log('select', select);
    setSelection(select);
  }

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
    if(retryCounter < allowedRetries) {
      return <span>Warming up and getting server ready.</span>
    }
    else {
      return <span>Exhausted retry, maybe a refresh may help.</span>
    }
  }, [retryCounter])

  return (
    <div className="container">
      <div className="login-box-container">
        {!ready && (<div><em>MESSAGE: </em>{_drawnMessage}</div>)}
        <section>
          <div className={'selector-container'}>
            <div onClick={()=>_changeTo(EnumSelection.ORDER)}>Order</div>
            <div style={{padding: "0 1rem"}}> | </div>
            <div onClick={()=>_changeTo(EnumSelection.LOCK)}>Lock</div>
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
