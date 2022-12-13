import axios from "axios";

export const fetchOrderStatus = async (orderId: string) => {
  const res = await axios.get(`/api/orders/${orderId}`);

  if (res.data.status !== "ready") {
    throw new Error("not ready");
  }

  return res.data;
};

export const updateOrderStatus = async (orderId: string) => {
  const res = await axios.post(`/api/orders/${orderId}`, {id: orderId});
  return res.data;
};