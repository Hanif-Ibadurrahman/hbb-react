import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/returnItem";
import { RootState } from "../../types";

const returnItemDomain = (state: RootState) =>
	state.returnItems || initialState;

export const selectReturnItems = createSelector(
	returnItemDomain,
	state => state,
);
export const selectReturnItem = createSelector(
	returnItemDomain,
	state => state.ReturnItem,
);
