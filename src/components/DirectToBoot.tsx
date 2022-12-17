import { getMessage } from "../utils";
import { useOrder } from "../hooks/useOrder";

const createButton = (status: string, onClick: () => void) => {
  switch (status) {
    case "initialised":
      return <button disabled>I'm here</button>;
    case "ready":
      return <button onClick={onClick}>I'm here</button>;
    case "error":
      return <button>04 23 33</button>;
    case "notified":
      return null;
  }
};

export function DirectToBoot({ orderId }: { orderId: string }) {
  const {status, notifyStore} = useOrder(orderId);

  return (
    <div>
      <h3>Direct to boot</h3>
      <p>{getMessage(status)}</p>
      {createButton(status, notifyStore)}
    </div>
  );
}
