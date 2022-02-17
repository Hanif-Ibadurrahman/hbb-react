import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/transporter";
import { RootState } from "../../types";

const transporterDomain = (state: RootState) =>
	state.transporters || initialState;

export const selectTransporters = createSelector(
	transporterDomain,
	state => state,
);
export const selectTransporter = createSelector(
	transporterDomain,
	state => state.Transporter,
);
