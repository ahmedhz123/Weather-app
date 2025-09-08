import { configureStore } from "@reduxjs/toolkit";
import weatherApiReducer from "./WeatherApiSlice";
export const store = configureStore({
  reducer: { weatherApiReducer },
});
