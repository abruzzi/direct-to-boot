import axios from "axios";
import {useQuery} from "@tanstack/react-query";

export function DirectToBoot({orderId}: { orderId: string }) {
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

  return <div className="container">
    <h3>Direct To Boot</h3>
    <p>Please click the button when you have arrived</p>
    <div className="buttonContainer">
      <button className="primaryButton" disabled={order.status !== 'ready'}>I am here</button>
    </div>
  </div>;
}