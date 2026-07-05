import api from "./api";

const getProducts = async (params = {}) => {
  const { data } = await api.get("/products", { params });
  return data;
};

const getFeaturedProducts = async () => {
  const { data } = await api.get("/products/featured");
  return data;
};

const getCategories = async () => {
  const { data } = await api.get("/products/categories");
  return data;
};

const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

const createProduct = async (formData) => {
  const { data } = await api.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

const updateProduct = async (id, formData) => {
  const { data } = await api.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export default {
  getProducts,
  getFeaturedProducts,
  getCategories,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
