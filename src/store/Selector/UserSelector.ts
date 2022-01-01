import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/user";
import { RootState } from "../../types";

const userDomain = (state: RootState) => state.users || initialState;

export const selectUsers = createSelector(userDomain, state => state);
export const selectUser = createSelector(userDomain, state => state.User);
