import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/division";
import { RootState } from "../../types";

const divisionDomain = (state: RootState) => state.divisions || initialState;

export const selectDivisions = createSelector(divisionDomain, state => state);
export const selectDivision = createSelector(
	divisionDomain,
	state => state.Division,
);
