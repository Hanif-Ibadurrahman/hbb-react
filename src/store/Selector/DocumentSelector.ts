import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/document";
import { RootState } from "../../types";

const documentDomain = (state: RootState) => state.documents || initialState;

export const selectDocuemnts = createSelector(documentDomain, state => state);
export const selectDocument = createSelector(
	documentDomain,
	state => state.Document,
);
