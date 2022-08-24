import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../Reducer/indexing";
import { RootState } from "../../types";

const indexDomain = (state: RootState) => state.indexings || initialState;

export const selectindexings = createSelector(indexDomain, state => state);
export const selectindexing = createSelector(
	indexDomain,
	state => state.Indexing,
);
export const selectindexingdocument = createSelector(
	indexDomain,
	state => state.IndexingDocument,
);

export const selectAssignToFolder = createSelector(
	indexDomain,
	state => state.AssignDocumentToFolder,
);

export const selectAssignToBox = createSelector(
	indexDomain,
	state => state.AssignFolderToBox,
);
