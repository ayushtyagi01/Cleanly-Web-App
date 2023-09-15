import { createSlice } from "@reduxjs/toolkit";
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
  isLoading: false,
};

const PostDataSlice = createSlice({
  name: "data",
  initialState: initState,
  reducers: {
    setCleaningType: (state, action) => {
      state.booking_data.cleaning_types = action.payload;
    },
    setCleaningFrequency: (state, action) => {
      state.booking_data.cleaning_frequencies = action.payload;
    },
    setExtras: (state, action) => {
      state.booking_data.extras = action.payload;
    },
    setSpecialRequirements: (state, action) => {
      state.booking_data.special_requirements = action.payload;
    },
    setBedRoom: (state, action) => {
      state.booking_data.room_types.bedroom = action.payload;
    },
    setBathRoom: (state, action) => {
      state.booking_data.room_types.bathroom = action.payload;
    },
    setDate: (state, action) => {
      state.booking_data.date = action.payload;
    },
    setHour: (state, action) => {
      state.booking_data.hours = action.payload;
    },
    setTimeSlot: (state, action) => {
      state.booking_data.time_slots = action.payload;
    },
    setEmail: (state, action) => {
      state.booking_data.email = action.payload;
    },
    setPhone: (state, action) => {
      state.booking_data.phone = action.payload;
    },
    setAddress: (state, action) => {
      state.booking_data.address = action.payload;
    },
    setPin: (state, action) => {
      state.booking_data.pin = action.payload;
    },
    setPrice: (state, action) => {
      state.booking_data.price = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCleaningType,
  setCleaningFrequency,
  setExtras,
  setBedRoom,
  setBathRoom,
  setSpecialRequirements,
  setDate,
  setHour,
  setTimeSlot,
  setEmail,
  setPhone,
  setAddress,
  setPin,
  setPrice,
  setLoading,
} = PostDataSlice.actions;

export default PostDataSlice.reducer;
