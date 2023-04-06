import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../reducer/loginReducer";
import { RootState } from "../../types";

const loginDomain = (state: RootState) => state.loginReducer || initialState;

export const loginSelector = createSelector(loginDomain, state => state);
