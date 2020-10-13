import { useState, useEffect, useCallback, useMemo, SFC } from 'react';
import {withPusher} from "../../modules/pusherhooks";
import {BUSINESS_PARTNER_ID, PARTNER_ID, PUSHER} from "../../shared/const";
import { GetServerSideProps } from 'next'

interface ILockers {
  [key: string]: ILocker;
}

interface ILocker {
  state: string;
  orderId: string;
}

const Locker:SFC<ILockers> = ({businessPartnerId, partnerId, appKey, cluster, channelName, backendServer, availOrderIds, lockerStatuses}) => {
  const DEFAULT_LOCK_STATE = 'unlocked';
  const [lockers, setLockers] = useState<ILockers>({});
  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState([]);

  const _printLockEvent = (msg:string) => {
    try{
      const messageInJson = JSON.parse(msg);
      const newState = {};
      const _state = messageInJson.state.split[0] !== 'unlocked' ? DEFAULT_LOCK_STATE: messageInJson.state;
      const newOrderId = (_state === DEFAULT_LOCK_STATE? '': messageInJson.orderId);
      newState[messageInJson.lockerId] = _generateValue(_state, newOrderId);
      setLockers(oldLockers => {return {...oldLockers, ...newState}});
    } catch(e) {
      //console.error(e);
    }
    setMessages(oldArray => [...oldArray, `[${new Date()} - lock event] ${msg}`])
  }

  const _printLockPusherSystem = (msg:string) => {
    setMessages(oldArray => [...oldArray, `[${new Date()} - lock system] ${msg}`])
  }

  const _printOrderEvent = (msg:string) => {
    try{
      const messageInJson = JSON.parse(msg);
      const currentOrders = [...orders];
      //const elemFound = orders.find(order => order === messageInJson.order_id);
      switch(messageInJson.status) {
        case "Order Placed":
          currentOrders.push(messageInJson.order_id);
          setOrders(currentOrders);
          break;
        case "Taken":
          const idxFound = currentOrders.indexOf(messageInJson.order_id)
          if(idxFound !== -1) {
            currentOrders.splice(idxFound, 1);
            setOrders(currentOrders);
          }
          break;
      }
    } catch(e) {
      //console.error(e);
    }
  }

  const _printOrderPusherSystem = (msg:string) => {
    setMessages(oldArray => [...oldArray, `[${new Date()} - order system] ${msg}`])
  }

  const {lockConnect, lockDisconnect, lockIsConnected} = (function (){
    const {connect, disconnect, isConnected } = withPusher(PUSHER.lockEvent, channelName, _printLockPusherSystem, _printLockEvent, appKey, cluster, true);
    return {
      lockConnect: connect,
      lockDisconnect: disconnect,
      lockIsConnected: isConnected
    }
  })();

  const {orderConnect, orderDisconnect, orderIsConnected} = (function (){
    const {connect, disconnect, isConnected } = withPusher(PUSHER.orderEvent, channelName, _printOrderPusherSystem, _printOrderEvent, appKey, cluster, true);
    return {
      orderConnect: connect,
      orderDisconnect: disconnect,
      orderIsConnected: isConnected
    }
  })();

  const _connectToLockPusher = () => {
    lockConnect();
  }

  const _connectToOrderPusher = () => {
    orderConnect();
  }

  useEffect(() => {
    _connectToLockPusher();
    _connectToOrderPusher();

    const initialLockers = {};
    for(let i = 0; i < lockerStatuses.length; i++) {
      const locker = lockerStatuses[i];
      initialLockers[locker.lockerId] = _generateValue(
        (locker.status? locker.status:DEFAULT_LOCK_STATE),
        (locker.orderId? locker.orderId:""));
    }

    setOrders(availOrderIds);
    setLockers(initialLockers);
  }, []);

  const _generateValue = (state:string, orderId: string):ILocker => {
    return {state, orderId};
  }

  const _changeLockState = (lockerId:string) => {
    return (lockers[lockerId].state === "locked"|| lockers[lockerId].state === "lock")?"unlock":"lock";
  }

  const _lockToBeState = useCallback((state:string) => {
    switch(state) {
      case "locked":
        return "unlock"
      case "unlocked":
      case "unlocked complete":
        return "lock"
      default:
        return "updating";
    }
  }, [lockers]);

  const _updateValue = (lockerId:string) => (event:any) => {
    const value = event.target.value;
    const newState = {};
    newState[lockerId] = _generateValue(lockers[lockerId].state, value);
    setLockers({...lockers, ...newState});
  }

  const _isLockerUpdating = (state:string) => {
    const _state = state.split(' ')[0];
    return _state === "lock" || _state === "unlock"
  }

  const _submitLocker = (lockerId:string) => (event:any) => {
    event.preventDefault();

    if (lockers[lockerId].orderId.trim() === '') {
      return;
    }

    const command = {
      "origin": "web",
      "locker_id":lockerId,
      "order_id":lockers[lockerId].orderId,
      "state": _changeLockState(lockerId)
    };

    fetch(`${backendServer}/api/locker/${businessPartnerId}/${partnerId}/trigger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(command)
    })
    .then(response => response.json)
    .then(response => {

    });

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
          <fieldset disabled={_isLockerUpdating(value.state)}>
            <legend className="screen-reader-only">#{key}</legend>

            <div className="container" >
              <select value={orderId} onChange={_updateValue(key)} disabled={lockers[key].state === "lock"}>
                <option value="">---Select an order---</option>
                {
                  orders.map(
                    (orderId, idx) => <option value={orderId} key={`order-${idx}`}>{orderId}</option>
                  )
                }
              </select>
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
  }, [lockers, orders]);

  const _drawDebug = useCallback(() => {
    for (const [key, value] of Object.entries(lockers)) {
      if(_isLockerUpdating(value.state)) {
        return "Sending orderid and locking basket.";
      }
    }
    return "Awaiting next update.";
  }, [lockers]);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    TWICE_NONAUTH_APP_KEY,
    TWICE_CHANNEL_NAME,
    PUSHER_CLUSTER,
    BACKEND_SERVER
  } = process.env;

  const availOrderIds = await fetch(`${BACKEND_SERVER}/api/locker/${BUSINESS_PARTNER_ID}/${PARTNER_ID}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer'
  }).then(res => res.json());

  const lockStatuses = await fetch(`${BACKEND_SERVER}/api/locker/${BUSINESS_PARTNER_ID}/${PARTNER_ID}/locks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer'
  }).then(res => res.json());

  return {
    props: {
      appKey: TWICE_NONAUTH_APP_KEY,
      channelName: TWICE_CHANNEL_NAME,
      cluster: PUSHER_CLUSTER,
      businessPartnerId: BUSINESS_PARTNER_ID,
      partnerId: PARTNER_ID,
      backendServer: BACKEND_SERVER,
      availOrderIds: (availOrderIds.orders? availOrderIds.orders:[]),
      lockerStatuses: (lockStatuses.locks? lockStatuses.locks:[])
    },
  }
};

export default Locker;
