import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/api" });

export const getAlgo = async () => {
  const res = await api.get("/neo4j_get");
  return res.data;
};

export const getUsernames = async () => {
  const res = await api.get("/users/usernames");
  return res.data;
};

export const getEmails = async () => {
  const res = await api.get("/users/emails");
  return res.data;
};

export const createUser = async (data) => {
  const res = await api.post("/users", data);
  return res.data;
};

export const getUser = async (data) => {
  const res = await api.get(`/users/user/${data.username}`);
  return res.data;
};

export const updateLocationUser = async (data) => {
  const res = await api.put(`/users/updateLocation/${data.username}`, data);
  return res.data;
};

export const updateUser = async (data) => {
  const res = await api.put(`/users/${data.username}`, data);
  return res.data;
};

export const deleteUser = async (data) => {
  console.log("los dato:", data);
  const res = await api.delete(`/users/${data.username}`);
  return res.data;
};

export const getAdmin = async (data) => {
  const res = await api.get(`/users/admin/${data.username}`);
  return res.data;
};
