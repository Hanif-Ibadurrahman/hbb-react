import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/car";
import { RootState } from "../../types";

const carDomain = (state: RootState) => state.cars || initialState;

export const selectCars = createSelector(carDomain, state => state);
export const selectCar = createSelector(carDomain, state => state.Car);
