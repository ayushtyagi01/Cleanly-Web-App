import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";
import axiosInstance from "../util/axios_auth";
import { ICleaningType } from "../util/Types/ICleaningType";
import { ICleaningFrequency } from "../util/Types/ICleaningFrequency";

const initState = {
  booking_data: {
    cleaning_types: ICleaningType,
    cleaning_frequencies: ICleaningFrequency,
    extras: [],
    special_requirements: "",
    room_types: {
      bedroom: 0,
      bathroom: 0,
    },
    date: "",
    hours: 0,
    time_slots: "",
    email: "",
    phone: "",
    address: "",
    pin: "",
    price: 0,
  },
};

export const getBookingData = createAsyncThunk(
  "getBookedData/post",
  async () => {
    const userId = (await Auth.currentUserInfo()).attributes.sub;
    const queryString = `?user_id=${userId}`;
    const response = await axiosInstance.get("/booking" + queryString);
    return response.data.Items;
  }
);

const getBookingSlice = createSlice({
  name: "data",
  initialState: initState,
  reducers: {
    setData: (state, action) => {
      state.booking_data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBookingData.fulfilled, (state, action) => {
      state.booking_data = action.payload;
    });
  },
});

export default getBookingSlice.reducer;
