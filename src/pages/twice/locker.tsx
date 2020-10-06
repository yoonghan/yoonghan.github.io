import { useState, useEffect, useCallback, useMemo, SFC } from 'react';
import {withPusher} from "../../modules/pusherhooks";
import {BUSINESS_PARTNER_ID, PARTNER_ID, PUSHER} from "../../shared/const";
import { GetServerSideProps } from 'next'

interface ILockers {
  noOfLockers: number;
}

const Locker:SFC<ILockers> = ({noOfLockers, businessPartnerId, partnerId, appKey, cluster, channelName, backendServer, availOrderIds}) => {
  const DEFAULT_LOCK_STATE = 'unlock';
  const [lockers, setLockers] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState([]);

  const _printLockEvent = (msg:string) => {
    try{
      const messageInJson = JSON.parse(msg);
      const newState = {};
      const newOrderId = (messageInJson.state === DEFAULT_LOCK_STATE? '': messageInJson.orderId);
      newState[messageInJson.lockerid] = _generateValue(messageInJson.state, newOrderId);
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

    const mockLockers = {};
    for(let i = 0; i < noOfLockers; i++) {
      mockLockers[`locker-${i}`] = _generateValue(DEFAULT_LOCK_STATE, "");
    }
    setOrders(availOrderIds);
    setLockers(mockLockers);
  }, []);

  const _generateValue = (state:string, orderId: string) => {
    return {state, orderId};
  }

  const _changeLockState = (lockerId:string) => {
    return lockers[lockerId].state === "lock"?"unlock":"lock";
  }

  const _lockToBeState = useCallback((state:string) => {
    return state === "lock"?"unlock":"lock";
  }, [lockers]);

  const _updateValue = (lockerId:string) => (event:any) => {
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
      "orderId":lockers[lockerId].orderId,
      "state": _changeLockState(lockerId)
    };

    fetch(`${backendServer}/api/locker/trigger/${businessPartnerId}/${partnerId}`, {
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
          <fieldset disabled={isUpdating}>
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
  }, [lockers, isUpdating, orders]);

  const _drawDebug = useCallback(() => {
    if(isUpdating) {
      return "Sending orderid and locking basket.";
    }
    else {
      return "Awaiting next update.";
    }
  }, [isUpdating]);

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

  const availOrderIds = await fetch(`${BACKEND_SERVER}/api/locker/order/${BUSINESS_PARTNER_ID}/${PARTNER_ID}`, {
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
      noOfLockers: 3,
      businessPartnerId: BUSINESS_PARTNER_ID,
      partnerId: PARTNER_ID,
      backendServer: BACKEND_SERVER,
      availOrderIds: (availOrderIds.orders? availOrderIds.orders:[])
    },
  }
};

export default Locker;
