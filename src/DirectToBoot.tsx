import {Status, useOrderStatus} from "./useOrderStatus";

const getMessage = (status: Status) => {
  switch (status) {
    case 'initialised':
      return "Please click the button when you have arrived, one of our friendly staff will bring your order to you.";
    case 'notified':
      return "Thanks for letting us know, your order will come to you in a minute";
    case "error":
      return "Something went wrong, please call the store: 023-0434-212!"
  }
}

const CallStoreButton = () => <button className="primaryButton" data-testid="call-the-store">Call the store</button>

export function DirectToBoot({orderId}: { orderId: string }) {
  const {order, status, notifyStore} = useOrderStatus(orderId);

  let button = null;

  if (status === 'error') {
    button = <CallStoreButton/>
  } else if(status === 'initialised') {
    button = <button className="primaryButton" disabled={order.status !== 'ready'} onClick={notifyStore}>I am here</button>
  } else if (status === 'notified') {
    button = null
  }

  return <div className="container">
    <h3>Direct To Boot</h3>
    <p>{getMessage(status)}</p>
    <div className="buttonContainer">
      {button}
    </div>
  </div>;
}