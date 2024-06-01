import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  laoding: false,
};

export const getAllUsers = createAsyncThunk("users", async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:8080/api/users/super-admin/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //console.log(response.data);
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Http isteği olmayan fonksiyonlar
  },
  extraReducers: (builder) => {
    // Http isteği olan fonksiyonlar
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
