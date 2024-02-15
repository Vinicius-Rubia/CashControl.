import { LoaderState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: LoaderState = {
  isActive: false,
  message: "",
};

export const slice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    activateLoader(state, { payload }: { payload: string | undefined }) {
      return { ...state, isActive: true, message: payload ?? "" };
    },
    deactivateLoader(state) {
      return { ...state, isActive: false, message: "" };
    },
  },
});

export const { activateLoader, deactivateLoader } = slice.actions;

export const selectLoader = (state: any) => state.loaderModel;

export default slice.reducer;
