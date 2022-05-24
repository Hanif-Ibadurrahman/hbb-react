import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/classification";
import { RootState } from "../../types";

const classificationDomain = (state: RootState) =>
	state.classifications || initialState;

export const selectClassifications = createSelector(
	classificationDomain,
	state => state,
);

export const selectClassification = createSelector(
	classificationDomain,
	state => state.Classification,
);
