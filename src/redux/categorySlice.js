import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../LocalStorage/categoryStorage";

const _initialState = getCategories();

const categorySlice = createSlice({
  name: "categories",
  initialState: _initialState,
  reducers: {
    addCategoryStore: (state, action) => {
      state.push(action.payload.category);
    },
    deleteAllCategoriesStore: (state, action) => {
      let categories = [];
      return categories;
    },
  },
});

export const { addCategoryStore, deleteAllCategoriesStore } =
  categorySlice.actions;
export default categorySlice.reducer;
