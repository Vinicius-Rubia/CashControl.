import { combineReducers, configureStore } from "@reduxjs/toolkit";
import employeesSlice from "./employeesSlice";
import loaderSlice from "./loaderSlice";

const combinedReducer = combineReducers({
  employeesModel: employeesSlice,
  loaderModel: loaderSlice,
});

const rootReducer = (state: any, action: any) => {
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer
});