import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../constants/config";

const initState = {
  cleaning_data: {
    cleaning_types: [],
    cleaning_frequencies: [],
    extras: [],
    room_types: [],
    time_slots: [],
  },
  isLoading: false,
};
export const fetchAllCategories = createAsyncThunk(
  "staticdata/fetch",
  async () => {
    const endpoints = [
      "cleaning_types",
      "cleaning_frequencies",
      "extras",
      "room_types",
      "time_slots",
    ];
    const cleaning_data = {
      cleaning_types: [],
      cleaning_frequencies: [],
      extras: [],
      room_types: [],
      time_slots: [],
    };
    await Promise.all(
      endpoints.map(async (endpoint) => {
        cleaning_data[endpoint as keyof typeof cleaning_data] = await axios
          .get(config.getStaticdataPath + "/" + endpoint)
          .then((res) => res.data)
          .catch((err) => err.message);
      })
    );
    return cleaning_data;
  }
);

const StaticDataSlice = createSlice({
  name: "data",
  initialState: initState,
  reducers: {
    setData: (state, action) => {
      state.cleaning_data = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.cleaning_data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAllCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { setData, setLoading } = StaticDataSlice.actions;

export default StaticDataSlice.reducer;
