/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "@reduxjs/toolkit";

import { InjectedReducersType } from "utils/types/injector-typings";
import boxes from "./Reducer/box";
import areas from "./Reducer/area";
import documents from "./Reducer/document";
import cabinets from "./Reducer/cabinet";
import folders from "./Reducer/folder";
import rooms from "./Reducer/room";
import requestBoxes from "./Reducer/requestBox";
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
	// Initially we don't have any injectedReducers, so returning identity function to avoid the error
	if (Object.keys(injectedReducers).length === 0) {
		return state => state;
	} else {
		return combineReducers({
			...injectedReducers,
			boxes,
			areas,
			documents,
			cabinets,
			folders,
			rooms,
			requestBoxes,
		});
	}
}
