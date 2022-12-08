import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";

export type Status = "initialised" | "ready" | "notified" | "error";

const maxRetries = 10;
export const useOrderStatus = (orderId: string) => {
  const [status, setStatus] = useState<Status>("initialised");
  const [count, setCount] = useState(0);

  const {data: order} = useQuery(
    ['order'],
    async () => {
      const res = await axios.get(`/api/orders/${orderId}`)
      return res.data
    },
    {
      initialData: {status: 'initialised'},
      onSettled: () => {
        setCount(count => count + 1)
      },
      onError: (error) => {
        setStatus('error');
      },
      refetchInterval: (order, query) => {
        if (count >= maxRetries) {
          return false;
        }
        return (order && order.status === 'ready' ? false : 1000)
      },
    },
  )

  useEffect(() => {
    if (count >= maxRetries) {
      setStatus('error');
    }
  }, [count]);

  useEffect(() => {
    if(order.status === 'ready') {
      setStatus('ready')
    }
  }, [order]);

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`/api/orders/${orderId}`, {id: id})
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