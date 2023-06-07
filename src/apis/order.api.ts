import httpRequest from "@/services/httpRequest";

export const getAllOrders = () => {
  return httpRequest.get("/orders");
};

export const addOrder = (data: any) => {
  return httpRequest.post("/orders", data);
};
