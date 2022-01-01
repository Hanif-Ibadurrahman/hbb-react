import React from "react";
import { BoxInterfaceState } from "store/Types/BoxTypes";
import { getAllArchiver, getAllTransporter } from "../api/user";
export const GET_TRANSPORTER_LIST = "GET_TRANSPORTER_LIST";
export const SET_USER_DATA = "GET_USER_DATA";
export const GET_ARCHIVER_LIST = "GET_ARCHIVER_LIST";

export const getTransporterList = page => {
	return async dispatch => {
		try {
			const response = await getAllTransporter(page);
			dispatch({
				type: GET_TRANSPORTER_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_TRANSPORTER_LIST,
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
