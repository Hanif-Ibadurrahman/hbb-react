import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/requestBox";
import { RootState } from "../../types";

// const boxDomain = (state: RootState) => state.boxes || initialState;

// export const selectBoxes = createSelector(boxDomain, state => state);
// export const selectBox = createSelector(boxDomain, state => state.Box);

const requestBoxDomain = (state: RootState) =>
	state.requestBoxes || initialState;

export const selectRequestBoxes = createSelector(
	requestBoxDomain,
	state => state,
);
export const selectRequestBox = createSelector(
	requestBoxDomain,
	state => state.RequestBox,
);
