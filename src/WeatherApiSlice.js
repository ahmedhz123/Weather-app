import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export let fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async () => {
    let res = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=44fee56d3f4b91b7015ac14f4e960d49"
    );
    let data = res.data;
    let temp = Math.round(data.main.temp - 272.15);
    let desc = data.weather[0].description;
    let min = Math.round(data.main.temp_min - 272.15);
    let max = Math.round(data.main.temp_max - 272.15);
    let icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    return { temp, desc, min, max, icon };
  }
);

export const weatherApiSlice = createSlice({
  name: "WeatherApi",
  initialState: {
    weather: {},
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
      state.weather = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchWeatherData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default weatherApiSlice.reducer;
