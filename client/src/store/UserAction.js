import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../helper/axiosInstance";
import { toast } from "react-toastify";

export const addUser = createAsyncThunk("users/adduser", async (data) => {
  const fetchData = () => {
    const response = axios.post("/user", data);
    return response;
  };
  try {
    const data = await fetchData();
    return data.data;
  } catch (error) {
    toast.warning("Error");
    return error;
  }
});

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const fetchData = () => {
    const response = axios.get("/user");
    return response;
  };
  try {
    const data = await fetchData();
    return data.data;
  } catch (error) {
    return error;
  }
});

export const getUserDetails = createAsyncThunk(
  "users/getUserDetails",
  async (id) => {
    const fetchData = () => {
      const response = axios.get(`/user/${id}`);
      return response;
    };
    try {
      const data = await fetchData();
      return data.data;
    } catch (error) {
      toast.warning("Error");
      return error;
    }
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  const fetchData = () => {
    const response = axios.delete(`/user/${id}`);
    return response;
  };
  try {
    const data = await fetchData();
    return data.data;
  } catch (error) {
    return error;
  }
});

export const sendMail = createAsyncThunk("users/sendMail", async (data) => {
  const fetchData = () => {
    const response = axios.post("/send/mail", data);
    return response;
  };
  try {
    const data = await fetchData();
    if (data.data.status === "sent") {
      toast.success("Email Sent");
    }
    return data.data;
  } catch (error) {
    toast.warning("Error");
    return error;
  }
});
