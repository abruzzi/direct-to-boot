import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";

function useOrder(orderId: string) {
  const {data: order = {status: undefined}} = useQuery(
    ['order'],
    async () => {
      const res = await axios.get(`/api/orders/${orderId}`)
      return res.data
    },
    {
      refetchInterval: order => (order && order.status === 'ready' ? false : 1000),
    },
  )

  return order;
}

export function DirectToBoot({orderId}: { orderId: string }) {
  const order = useOrder(orderId);
  const [notified, setNotified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`/api/orders/${orderId}`, {id: orderId})
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['order']})
      setNotified(true);
    },
    onError: () => {
      setError(true);
    }
  })

  const notifyStore = () => {
    mutation.mutate(orderId)
  }

  return <div className="container">
    <h3>Direct To Boot</h3>
    {
      notified ? <p>Thanks for letting us know, your order will come to you in a minute</p> :
        <p>Please click the button when you have arrived, one of our friendly staff will bring your order to you.</p>
    }
    <div className="buttonContainer">
      {!notified && !error &&
        <button className="primaryButton" disabled={order.status !== 'ready'} onClick={notifyStore}>I am here</button>}
      {error && <button className="primaryButton" data-testid="call-the-store">Call the store</button>}
    </div>
  </div>;
}