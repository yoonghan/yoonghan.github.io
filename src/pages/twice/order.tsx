import { useState, useEffect, useCallback, useMemo, SFC } from 'react';
import {withPusher} from "../../modules/pusherhooks";
import {BUSINESS_PARTNER_ID, PARTNER_ID} from "../../shared/const";
import { GetServerSideProps } from 'next';

interface IOrder {
}

const Order:SFC<IOrder> = ({backendServer, businessPartnerId, partnerId}) => {
  const [orderId, setOrderId] = useState('');
  const [contactType, setContactType] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = React.useState('');

  const CONTACT_TYPES_AVAILABLE = ["Push Notification", "Email", "SMS", "Representative"];

  const _updateOrderId = (event:any) => {
    const value = event.target.value;
    setOrderId(value);
  }

  const _updateContactType = (event:any) => {
    const value = event.target.value;
    setContactType(value);
  }

  const _updateContactInfo = (event:any) => {
    const value = event.target.value;
    setContactInfo(value);
  }

  const _drawnOptions = useMemo(() => (
    CONTACT_TYPES_AVAILABLE.map((elem, idx) => (
      <option value={elem} key={`contacttype_${idx}`}>{elem}</option>
    ))
  ), []);

  const _drawnDebug = useMemo(() => {
    if(isUpdating) {
      return "Sending orderid and locking basket.";
    }
    else {
      return "Awaiting next update.";
    }
  }, [isUpdating]);

  const _onSubmit = (e:any) => {
    e.preventDefault();

    if(orderId === '' || contactType === '' || contactInfo === '') {
      setMessage('All fields are mandatory!');
      return;
    }

    setIsUpdating(true);
    setMessage('Updating server');

    const command = {
      "order_id": orderId,
      "contact_type": contactType,
      "contact_info": contactInfo
    };

    fetch(`${backendServer}/api/locker/${businessPartnerId}/${partnerId}/order`, {
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
      setMessage(`Submitted ${orderId}`);
      setContactType('');
      setContactInfo('');
      setOrderId('');
    });
  }

  const _drawnMessage = useMemo(() => {
    return <li>{message}</li>;
  }, [message]);

  return (
    <div>
      <h2>Place Order</h2>
      <form onSubmit={_onSubmit}>
        <fieldset disabled={isUpdating}>
          <legend>Order Info</legend>
          <div className="field-container">
            <label>Order Id: </label>
            <input type="text" value={orderId} onChange={_updateOrderId}></input>
          </div>
        </fieldset>
        <fieldset disabled={isUpdating}>
          <legend>Deliverer</legend>
          <div className="field-container">
            <label>Contact Type: </label>
            <select onChange={_updateContactType} value={contactType}>
              <option value="">Select one</option>
              {_drawnOptions}
            </select>
          </div>
          <div className="field-container">
            <label>Contact Membership/Number/Email: </label>
            <input type="input" value={contactInfo} onChange={_updateContactInfo}></input>
          </div>
        </fieldset>
        <div className="submit-button">
          <input type="submit"></input>
        </div>

        <div className="debugger-container">
          <h3>Debugging message</h3>
          <div>{_drawnDebug}</div>
          <ul>{_drawnMessage}</ul>
        </div>
      </form>
      <style jsx>{`
        .field-container {
          display: flex;
        }
        .field-container > label {
          padding-right: 1rem;
        }
        .submit-button {
          padding: 1rem;
        }
        .debugger-container {
          margin-top: 20px;
          padding: 5rem;
          color: blue;
        }
      `}</style>
    </div>
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    BACKEND_SERVER
  } = process.env;

  return {
    props: {
      businessPartnerId: BUSINESS_PARTNER_ID,
      partnerId: PARTNER_ID,
      backendServer: BACKEND_SERVER
    },
  }
};

export default Order;
