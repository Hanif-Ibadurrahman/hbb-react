import React from "react";
import { getAllTransporter } from "../api/user";
export const GET_TRANSPORTER_LIST = "GET_TRANSPORTER_LIST";
export const SET_TRANSPORTER_DATA = "GET_TRANSPORTER_DATA";

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
