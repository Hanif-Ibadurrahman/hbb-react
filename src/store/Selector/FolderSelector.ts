import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/folder";
import { RootState } from "../../types";

const folderDomain = (state: RootState) => state.folders || initialState;

export const selectFolders = createSelector(folderDomain, state => state);
export const selectFolder = createSelector(folderDomain, state => state.Folder);
