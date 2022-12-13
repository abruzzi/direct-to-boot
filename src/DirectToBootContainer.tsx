import {useEffect, useState} from "react";
import {DirectToBoot} from "./DirectToBoot";
import axios from "axios";

export function DirectToBootContainer({orderId}: { orderId: string }) {
  const [status, setStatus] = useState<string>('initialised');

  const notifyStore = async () => {
    const res = await axios.post(`/api/orders/${orderId}`)
    setStatus(res.data.status === 'notified' ? 'notified' : 'error')
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try{
        const res = await axios.get(`/api/orders/${orderId}`);
        setStatus(res.data.status)
      }catch(e) {
        setStatus('error')
      }
    }

    fetchOrder();
  }, [orderId]);

  return <DirectToBoot status={status} notifyStore={notifyStore} />;
}