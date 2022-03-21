import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/staff";
import { RootState } from "../../types";

const staffDomain = (state: RootState) => state.staffs || initialState;
const rolesDomain = (state: RootState) => state.roles || initialState;

export const selectStaffs = createSelector(staffDomain, state => state);
export const selectRoles = createSelector(staffDomain, state => state);
export const selectStaff = createSelector(staffDomain, state => state.Staff);
