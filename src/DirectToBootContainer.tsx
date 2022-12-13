import {useEffect, useState} from "react";
import {DirectToBoot} from "./DirectToBoot";
import axios from "axios";

export function DirectToBootContainer({orderId}: { orderId: string }) {
  const [status, setStatus] = useState<string>('initialised');

  const notifyStore = async () => {
    try {
      const res = await axios.post(`/api/orders/${orderId}`)
      setStatus(res.data.status === 'notified' ? 'notified' : 'error')
    } catch(e) {
      setStatus('error')
    }
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try{
        const res = await axios.get(`/api/orders/${orderId}`);
        if(res.data.status === 'ready') {
          clearInterval(id)
        }
        setStatus(res.data.status)
      }catch(e) {
        setStatus('error')
      }
    }

    const id = setInterval(() => {
      fetchOrder();
    }, 1000);

    return () => {
      clearInterval(id);
    }
  }, [orderId]);

  return <DirectToBoot status={status} notifyStore={notifyStore} />;
}