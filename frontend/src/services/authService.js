import api from "../api/api";

export const loginAdmin = async (email, password) => {
  const res = await api.post("/auth/admin/login", { email, password });
  return res.data;
};

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminData");
};
