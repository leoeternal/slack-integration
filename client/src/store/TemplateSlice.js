import { createSlice } from "@reduxjs/toolkit";
import { addTemplate, getTemplates, deleteTemplate } from "./TemplateAction";

const initialState = {
  templateAdded: false,
  templates: [],
  templateDeleted: false,
};

export const templateSlice = createSlice({
  name: "template",
  initialState: initialState,
  reducers: {
    updateTemplateAddedValue: (state, action) => {
      state.templateAdded = false;
    },
    updateTemplateDeletedValue: (state, action) => {
      state.templateDeleted = false;
    },
  },
  extraReducers: {
    [addTemplate.pending]: () => {
      console.log("pending");
    },
    [addTemplate.fulfilled]: (state, action) => {
      state.templateAdded = true;
    },
    [addTemplate.rejected]: () => {
      console.log("rejected");
    },
    [getTemplates.pending]: () => {
      console.log("pending");
    },
    [getTemplates.fulfilled]: (state, action) => {
      state.templates = action.payload;
    },
    [getTemplates.rejected]: () => {
      console.log("rejected");
    },
    [deleteTemplate.pending]: () => {
      console.log("pending");
    },
    [deleteTemplate.fulfilled]: (state, action) => {
      state.templateDeleted = true;
    },
    [deleteTemplate.rejected]: () => {
      console.log("rejected");
    },
  },
});

export const templateAction = templateSlice.actions;
export default templateSlice;
