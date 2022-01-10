import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/customer";
import { RootState } from "../../types";

const customerDomain = (state: RootState) => state.customers || initialState;

export const selectCustomers = createSelector(customerDomain, state => state);
export const selectCustomer = createSelector(
	customerDomain,
	state => state.Customer,
);
