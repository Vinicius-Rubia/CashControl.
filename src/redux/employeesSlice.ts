import { IEmployeesState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IEmployeesState = {
  employees: [
    {
      amount: 700,
      created_At: new Date(),
      updated_At: new Date(),
      dateTransaction: new Date("2024-01-12"),
      id: "57488e18-da0a-4426-9b5b-fb4732587955",
      name: "Vinicius",
    },
    {
      amount: 147.68,
      created_At: new Date(),
      updated_At: new Date(),
      dateTransaction: new Date("2023-10-27"),
      id: "57488e18-da0a-4426-9b5b-fb4732587954",
      name: "Alcione",
    },
    {
      amount: 455.70,
      created_At: new Date(),
      updated_At: new Date(),
      dateTransaction: new Date("2023-07-15"),
      id: "57488e18-da0a-4426-9b5b-fb4732587953",
      name: "Ilson",
    },
    {
      amount: 679.85,
      created_At: new Date(),
      updated_At: new Date(),
      dateTransaction: new Date("2023-02-30"),
      id: "57488e18-da0a-4426-9b5b-fb4732587952",
      name: "Lucas",
    },
    {
      amount: 2477,
      created_At: new Date(),
      updated_At: new Date(),
      dateTransaction: new Date("2023-05-01"),
      id: "57488e18-da0a-4426-9b5b-fb4732587951",
      name: "Beatriz",
    },
  ]
};

const slice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployees(state, { payload }: { payload: IEmployeesState["employees"] }) {
      state.employees = payload;
    },
  },
});

export const { setEmployees } = slice.actions;

export const selectEmployee = (state: any): IEmployeesState => state.employeesModel;

export default slice.reducer;
