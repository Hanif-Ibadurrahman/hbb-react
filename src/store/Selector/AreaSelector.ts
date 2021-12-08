import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/area";
import { RootState } from "../../types";

const areaDomain = (state: RootState) => state.areas || initialState;

export const selectAreas = createSelector(areaDomain, state => state);
export const selectArea = createSelector(areaDomain, state => state.Area);
