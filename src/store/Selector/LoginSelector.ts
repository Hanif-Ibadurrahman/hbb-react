import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/login";
import { RootState } from "../../types";

const loginDomain = (state: RootState) => state.logins || initialState;

export const selectLogins = createSelector(loginDomain, state => state);
export const selectLogin = createSelector(loginDomain, state => state.Login);
