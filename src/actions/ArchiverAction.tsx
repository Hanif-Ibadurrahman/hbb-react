import React from "react";
import { getAllArchiver } from "../api/user";
export const SET_ARCHIVER_DATA = "GET_ARCHIVER_DATA";
export const GET_ARCHIVER_LIST = "GET_ARCHIVER_LIST";

export const getArchiverList = page => {
	return async dispatch => {
		try {
			const response = await getAllArchiver(page);
			dispatch({
				type: GET_ARCHIVER_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_ARCHIVER_LIST,
				payload: {
					data: false,
					errorMessage: error.message,
				},
			});
			console.log(error);
			throw error;
		}
	};
};
