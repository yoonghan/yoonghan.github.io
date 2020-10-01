import { useState, useEffect, useCallback, useMemo, SFC } from 'react';
import {withPusher} from "../../modules/pusherhooks";
import { GetStaticProps } from 'next'

interface ILockers {
  noOfLockers: number;
}

const Locker:SFC<ILockers> = ({noOfLockers, groupId, businessPartnerId, appKey, cluster, channelName}) => {
  const DEFAULT_LOCK_STATE = 'unlock';
  const [lockers, setLockers] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [messages, setMessages] = React.useState([]);

  const _printEvent = (msg:string) => {
    try{
      const messageInJson = JSON.parse(msg);
      const newState = {};
      const newOrderId = (messageInJson.state === DEFAULT_LOCK_STATE? '': messageInJson.orderId);
      newState[messageInJson.lockerid] = _generateValue(messageInJson.state, newOrderId);
      setLockers(oldLockers => {return {...oldLockers, ...newState}});
    } catch(e) {
      //console.error(e);
    }
    setMessages(oldArray => [...oldArray, `[${new Date()} - event] ${msg}`])
  }

  const _printSystem = (msg:string) => {
    setMessages(oldArray => [...oldArray, `[${new Date()} - system] ${msg}`])
  }

  const {connect, disconnect, isConnected} = withPusher(channelName, _printSystem, _printEvent, appKey, cluster, true);

  const _connectToPusher = () => {
    connect();
  }

  useEffect(() => {
    _connectToPusher();

    const mockLockers = {};
    for(let i = 0; i < noOfLockers; i++) {
      mockLockers[`locker-${i}`] = _generateValue(DEFAULT_LOCK_STATE, "");
    }
    setLockers(mockLockers);
  }, []);

  useEffect(() => {
    if(isRetrieving) {
      const command = {"groupid": groupId, "wait": 30000};

      fetch('/api/locker/consumer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(command)
      })
      .then(response => response.json)
      .then(response => {setIsRetrieving(false)});
    }
  }, [isRetrieving]);

  const _generateValue = (state:string, orderId: string) => {
    return {state, orderId};
  }

  const _changeLockState = (lockerId:string) => {
    return lockers[lockerId].state === "lock"?"unlock":"lock";
  }

  const _lockToBeState = useCallback((state:string) => {
    return state === "lock"?"unlock":"lock";
  }, [lockers]);

  const _updateValue = (lockerId:string) => (event:string) => {
    const value = event.target.value;
    const newState = {};
    newState[lockerId] = _generateValue(lockers[lockerId].state, value);
    setLockers({...lockers, ...newState});
  }

  const _submitLocker = (lockerId:string) => (event:any) => {
    event.preventDefault();

    if (lockers[lockerId].orderId.trim() === '') {
      return;
    }

    setIsUpdating(true);

    const command = {
      "origin": "web",
      "lockerid":lockerId,
      "businessPartnerId": businessPartnerId,
      "orderId":lockers[lockerId].orderId,
      "state": _changeLockState(lockerId)
    };

    fetch('/api/locker/producer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(command)
    })
    .then(response => response.json)
    .then(response => {
      setIsUpdating(false);
      setIsRetrieving(true)}
    );

    return false;
  }

  const _isLockInputEnabled = (currentState:string) => {
    return currentState === "lock";
  }

  const _drawLockers = useCallback(() => {
    const drawnLockers = [];
    for (const [key, value] of Object.entries(lockers)) {
      const orderId = value.orderId;
      drawnLockers.push(
        <form key={`${key}`} onSubmit={_submitLocker(key)}>
          <fieldset disabled={isUpdating}>
            <legend className="screen-reader-only">#{key}</legend>

            <div className="container" >
              <input
                type="text"
                placeholder="order id"
                onChange={_updateValue(key)}
                value={orderId}
                disabled={_isLockInputEnabled(value.state)}
                >
                </input>
              <input type="submit" value={_lockToBeState(value.state)}></input>
            </div>
          </fieldset>
          <style jsx>{`
            .container {
              display: flex;
              justify-content: space-between;
            }
          `}</style>
        </form>
      );
    }

    return drawnLockers;
  }, [lockers, isUpdating]);

  const _drawDebug = useCallback(() => {
    if(isUpdating) {
      return "Sending orderid and locking basket.";
    }
    else if(isRetrieving) {
      return "Getting latest status.";
    }
    else {
      return "Awaiting next update.";
    }
  }, [isUpdating, isRetrieving]);

  const _drawnMessages = useCallback(() => {
    const elems = messages.map((elem, idx) => <li key={`msg-${idx}`}>{elem}</li>);
    return elems;
  }, [messages]);

  return (
    <div>
      <h2>Shop #1</h2>
      <div className="locker-container">
        {_drawLockers()}
      </div>
      <div className="debugger-container">
        <h3>Debugging message</h3>
        <div>{_drawDebug()}</div>
        <ul>{_drawnMessages()}</ul>
      </div>
      <style jsx>{`
        .locker-container {
          display: 'flex';
          flex-direction: row;
        }
        .debugger-container {
          margin-top: 20px;
          padding: 5rem;
          color: blue;
        }
      `}</style>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    TWICE_NONAUTH_APP_KEY,
    TWICE_CHANNEL_NAME,
    PUSHER_CLUSTER
  } = process.env;

  return {
    props: {
      appKey: TWICE_NONAUTH_APP_KEY,
      channelName: TWICE_CHANNEL_NAME,
      cluster: PUSHER_CLUSTER,
      noOfLockers: 3,
      groupId: 'tzuyu',
      businessPartnerId: 'recZxB64vYTvdU9yN'
    },
  }
};

export default Locker;
