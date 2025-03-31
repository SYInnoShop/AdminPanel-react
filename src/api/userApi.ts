import axios, { AxiosResponse } from "axios";
import { User, CreateUser, UpdateUser } from "../types/user";
import { setupInterceptors } from "./interceptors";


const apiClient = axios.create({
  baseURL: "https://user-webapi.azurewebsites.net/api/User",
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(apiClient);


const getAllUsers = async (): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await apiClient.get("/");
  return response.data;
};

const getUserById = async (id: number): Promise<User> => {
  const response: AxiosResponse<User> = await apiClient.get(`/${id}`);
  return response.data;
};

const createUser = async (userData: CreateUser): Promise<User> => {
  const response: AxiosResponse<User> = await apiClient.post("/", userData);
  return response.data;
};

const updateUser = async (userData: UpdateUser): Promise<User> => {
  const response: AxiosResponse<User> = await apiClient.put(`/${userData.id}`, userData);
  return response.data;
};

const deleteUser = async (id: number): Promise<void> => {
  await apiClient.delete(`/${id}`);
};

export const userApi = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};