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
import companys from "./Reducer/company";
import requestBoxes from "./Reducer/requestBox";
import cars from "./Reducer/car";
import divisions from "./Reducer/division";
import borrowItems from "./Reducer/borrowItem";
import transporters from "./Reducer/transporter";
import archivers from "./Reducer/archiver";
import logins from "./Reducer/login";
import pickUpItems from "./Reducer/pickUp";
import customers from "./Reducer/customer";
import returnItems from "./Reducer/returnItem";
import staffs from "./Reducer/staff";
import activityLogs from "./Reducer/activityLog";
import indexings from "./Reducer/indexing";
import classifications from "./Reducer/classification";

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
			companys,
			requestBoxes,
			cars,
			divisions,
			borrowItems,
			transporters,
			archivers,
			logins,
			pickUpItems,
			customers,
			returnItems,
			staffs,
			activityLogs,
			indexings,
			classifications,
		});
	}
}
