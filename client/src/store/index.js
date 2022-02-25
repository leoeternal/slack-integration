import { configureStore } from "@reduxjs/toolkit";
import templateSlice from "./TemplateSlice";
import userSlice from "./UserSlice";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    template: templateSlice.reducer,
  },
});
