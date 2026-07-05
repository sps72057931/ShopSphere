import api from "./api";

const register = async (name, email, password) => {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
};

const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

const updateProfile = async (payload) => {
  const { data } = await api.put("/auth/profile", payload);
  return data;
};

export default { register, login, getMe, updateProfile };
