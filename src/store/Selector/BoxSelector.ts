import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/box";
import { RootState } from "../../types";

const boxDomain = (state: RootState) => state.boxes || initialState;

export const selectBoxes = createSelector(boxDomain, state => state);
export const selectBox = createSelector(boxDomain, state => state.Box);
