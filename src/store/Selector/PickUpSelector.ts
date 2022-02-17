import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/pickUp";
import { RootState } from "../../types";

const pickUpItemDomain = (state: RootState) =>
	state.pickUpItems || initialState;

export const selectPickUpItems = createSelector(
	pickUpItemDomain,
	state => state,
);
export const selectPickUpItem = createSelector(
	pickUpItemDomain,
	state => state.PickUpItem,
);
