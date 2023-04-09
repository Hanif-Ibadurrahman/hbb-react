import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../types";
import countryReducer from "store/reducer/country";

const countryDomain = (state: RootState) => {
	return state.countryReducer || countryReducer;
};

export const countrySelector = createSelector(countryDomain, state => state);
