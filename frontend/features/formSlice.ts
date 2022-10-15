import { createSlice } from "@reduxjs/toolkit";

export type FormState = {
  value: "login" | "register";
};

const initialState: FormState = {
  value: "register",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    login: (state) => {
      state.value = "login";
    },
    register: (state) => {
      state.value = "register";
    },
  },
});

export const { login, register } = formSlice.actions;
export default formSlice.reducer;
