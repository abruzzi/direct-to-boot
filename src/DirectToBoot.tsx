import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useState} from "react";

function useOrder(orderId: string) {
  const {data: order = {status: undefined}, error} = useQuery(
    ['order'],
    async () => {
      const res = await axios.get(`/api/orders/${orderId}`)
      return res.data
    },
    {
      refetchInterval: order => (order && order.status === 'ready' ? false : 1000),
    },
  )

  return {
    order,
    error
  };
}

type Status = "initialised" | "notified" | "error";

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

const IAmHereButton = ({orderId, onClick}: { orderId: string, onClick: () => void }) => {
  const {order, error} = useOrder(orderId);
  
  if(error) {
    return <CallStoreButton />
  }

  return <button className="primaryButton" disabled={order.status !== 'ready'} onClick={onClick}>I am here</button>
}

const CallStoreButton = () => <button className="primaryButton" data-testid="call-the-store">Call the store</button>


const useNotifyStore = (orderId: string) => {
  const [status, setStatus] = useState<Status>("initialised");

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`/api/orders/${orderId}`, {id: orderId})
      return res.data
    },
    onSuccess: () => {
      setStatus("notified");
    },
    onError: () => {
      setStatus("error");
    }
  })

  const notifyStore = () => {
    mutation.mutate(orderId)
  }

  return {
    status,
    notifyStore
  }
}

export function DirectToBoot({orderId}: { orderId: string }) {
  const {status, notifyStore} = useNotifyStore(orderId);

  let button = null;

  if(status === 'initialised') {
    button = <IAmHereButton orderId={orderId} onClick={notifyStore} />
  } else if (status === 'error') {
    button = <CallStoreButton/>
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