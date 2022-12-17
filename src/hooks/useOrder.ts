import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchOrder, sendNotifyStore } from "../orderApi";

export const useOrder = (orderId: string) => {
  const [status, setStatus] = useState<string>("initialised");

  useQuery(["fetchOrder"], () => fetchOrder(orderId), {
    retry: 5,
    refetchOnWindowFocus: false,
    onError: () => setStatus("error"),
    onSuccess: () => setStatus("ready"),
  });

  const { mutate } = useMutation(["sendNotifyStore"], sendNotifyStore, {
    onSuccess: () => setStatus("notified"),
    onError: () => setStatus("error"),
  });

  const notifyStore = () => mutate(orderId);

  return {
    status,
    notifyStore,
  };
};