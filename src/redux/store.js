import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import categoryReducer from "./categorySlice";
export default configureStore({
  reducer: {
    tasks: taskReducer,
    categories: categoryReducer,
  },
});
