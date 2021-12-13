import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/cabinet";
import { RootState } from "../../types";

const cabinetDomain = (state: RootState) => state.cabinets || initialState;

export const selectCabinets = createSelector(cabinetDomain, state => state);
export const selectCabinet = createSelector(
	cabinetDomain,
	state => state.Cabinet,
);
