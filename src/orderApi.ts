import axios from "axios";

export const fetchOrder = (orderId: string) => {
  return axios.get(`/api/orders/${orderId}`).then((res) => {
    if (res.data.status === "ready") {
      return res.data;
    } else {
      throw new Error("fetch error");
    }
  });
};

export const sendNotifyStore = (orderId: string) => {
  return axios.post(`/api/orders/${orderId}`, {id: orderId});
}