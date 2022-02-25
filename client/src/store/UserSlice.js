import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  getUsers,
  deleteUser,
  getUserDetails,
  sendMail,
} from "./UserAction";

const initialState = {
  userAdded: false,
  userDeleted: false,
  users: [],
  userDetails: {},
  userId:
    localStorage.getItem("id") === null ? false : localStorage.getItem("id"),
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUserAddedValue: (state, action) => {
      state.userAdded = false;
    },
    updateUserDeletedValue: (state, action) => {
      state.userDeleted = false;
    },
    updateUserIdValue: (state, action) => {
      localStorage.setItem("id", action.payload);
      state.userId = action.payload;
    },
    removeUserIdValue: (state, action) => {
      state.userId = false;
      state.userDetails = {};
      localStorage.removeItem("id");
    },
  },
  extraReducers: {
    [addUser.pending]: () => {
      console.log("pending");
    },
    [addUser.fulfilled]: (state, action) => {
      localStorage.setItem("id", action.payload._id);
      state.userId = action.payload._id;
      state.userAdded = true;
    },
    [addUser.rejected]: () => {
      console.log("rejected");
    },
    [getUsers.pending]: () => {
      console.log("pending");
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [getUsers.rejected]: () => {
      console.log("rejected");
    },
    [deleteUser.pending]: () => {
      console.log("pending");
    },
    [deleteUser.fulfilled]: (state, action) => {
      if (localStorage.getItem("id") === action.payload._id) {
        localStorage.removeItem("id");
      }
      state.userId = false;
      state.userDeleted = true;
    },
    [deleteUser.rejected]: () => {
      console.log("rejected");
    },
    [getUserDetails.pending]: () => {
      console.log("pending");
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.userDetails = action.payload;
    },
    [getUserDetails.rejected]: () => {
      console.log("rejected");
    },
    [sendMail.pending]: () => {
      console.log("pending");
    },
    [sendMail.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [sendMail.rejected]: () => {
      console.log("rejected");
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
