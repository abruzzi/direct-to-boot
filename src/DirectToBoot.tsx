import {Status, useOrderStatus} from "./useOrderStatus";

const getMessage = (status: Status) => {
  switch (status) {
    case 'initialised':
    case 'ready':
      return "Please click the button when you have arrived, one of our friendly staff will bring your order to you.";
    case 'notified':
      return "Thanks for letting us know, your order will come to you in a minute";
    case "error":
      return "Something went wrong, please call the store: 023-0434-212!"
  }
}

function createButton(status: Status, notifyStore: () => void) {
  if (status === 'error') {
    return <button className="primaryButton" data-testid="call-the-store">Call the store</button>
  } else if (status === 'initialised') {
    return <button className="primaryButton" disabled>I am here</button>
  } else if (status === 'ready') {
    return <button className="primaryButton" onClick={notifyStore}>I am here</button>
  } else if (status === 'notified') {
    return null;
  }
}

export function DirectToBoot({orderId}: { orderId: string }) {
  const {status, notifyStore} = useOrderStatus(orderId);
  const button = createButton(status, notifyStore);

  return <div className="container">
    <h3>Direct To Boot</h3>
    <p>{getMessage(status)}</p>
    <div className="buttonContainer">
      {button}
    </div>
  </div>;
}