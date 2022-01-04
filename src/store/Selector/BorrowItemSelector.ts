import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/borrowItem";
import { RootState } from "../../types";

const borrowItemDomain = (state: RootState) =>
	state.borrowItems || initialState;

export const selectBorrowItems = createSelector(
	borrowItemDomain,
	state => state,
);
export const selectBorrowItem = createSelector(
	borrowItemDomain,
	state => state.BorrowItem,
);
