import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/archiver";
import { RootState } from "../../types";

const archiverDomain = (state: RootState) => state.archivers || initialState;

export const selectArchivers = createSelector(archiverDomain, state => state);
export const selectArchiver = createSelector(
	archiverDomain,
	state => state.Archiver,
);
