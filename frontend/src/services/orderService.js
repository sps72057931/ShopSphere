import api from "./api";

const createOrder = async (orderData) => {
  const { data } = await api.post("/orders", orderData);
  return data;
};

const getMyOrders = async () => {
  const { data } = await api.get("/orders/myorders");
  return data;
};

const getOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

const getAllOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

const updateOrderStatus = async (id, status) => {
  const { data } = await api.put(`/orders/${id}/status`, { status });
  return data;
};

export default {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
