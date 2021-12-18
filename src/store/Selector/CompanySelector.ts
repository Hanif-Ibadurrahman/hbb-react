import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/company";
import { RootState } from "../../types";

const companyDomain = (state: RootState) => state.companys || initialState;

export const selectCompanys = createSelector(companyDomain, state => state);
export const selectCompany = createSelector(
	companyDomain,
	state => state.Company,
);
