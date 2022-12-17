import { useState } from "react";
import { DirectToBoot } from "./DirectToBoot";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchOrderStatus, updateOrderStatus } from "../api";
import { Status } from "../types";

export function DirectToBootContainer({ orderId }: { orderId: string }) {
  const [status, setStatus] = useState<Status>("initialised");

  useQuery(["order"], async () => await fetchOrderStatus(orderId), {
    initialData: { status: "initialised" },
    retry: 5,
    refetchOnWindowFocus: false,
    onSuccess: () => setStatus("ready"),
    onError: () => setStatus("error"),
  });

  const mutation = useMutation(updateOrderStatus, {
    onSuccess: () => setStatus("notified"),
    onError: () => setStatus("error"),
  });

  return (
    <DirectToBoot
      status={status}
      notifyStore={() => mutation.mutate(orderId)}
    />
  );
}
