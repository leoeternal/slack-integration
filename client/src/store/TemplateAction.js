import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../helper/axiosInstance";
import { toast } from "react-toastify";

export const addTemplate = createAsyncThunk(
  "users/addTemplate",
  async (data) => {
    const fetchData = () => {
      const response = axios.post("/template", data);
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

export const getTemplates = createAsyncThunk("users/getTemplates", async () => {
  const fetchData = () => {
    const response = axios.get("/template");
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

export const deleteTemplate = createAsyncThunk(
  "users/deleteTemplate",
  async (id) => {
    const fetchData = () => {
      const response = axios.delete(`/template/${id}`);
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
