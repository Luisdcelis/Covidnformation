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
  const res = await api.delete(`/users/${data.username}`);
  return res.data;
};

export const getAdmin = async (data) => {
  const res = await api.get(`/users/admin/${data.username}`);
  return res.data;
};

export const getCloseCircle = async (data) => {
  const res = await api.get(`/users/closecircle/${data.username}`);
  return res.data.result;
};

export const getNotifications = async (data) => {
  const res = await api.get(`/users/notifications/${data.username}`);
  return res.data.result;
};

export const getPetitions = async (data) => {
  const res = await api.get(`/users/petitions/${data.username}`);
  return res.data.result;
};

export const deleteNotification = async (data) => {
  const res = await api.delete(
    `/users/notifications/${data.receiver}/${data.sender}`
  );
  return res.data.result;
};

export const deletePetition = async (data) => {
  const res = await api.delete(`/users/petitions/${data.from}/${data.to}`);
  return res.data.result;
};

export const createPetition = async (data) => {
  const res = await api.post(`/users/petitions/${data.from}/${data.to}`);
  return res.data.result;
};

export const createInContact = async (data) => {
  const res = await api.post(`/users/InContact/${data.from}/${data.to}`, data);
  return res.data.result;
};

export const updateCloseCircle = async (data) => {
  const res = await api.put(`/users/updateCC/${data.username}`, data);
  return res.data.result;
};

export const updateInContact = async (data) => {
  const res = await api.put(`/users/updateIC/${data.username}`, data);
  return res.data.result;
};
