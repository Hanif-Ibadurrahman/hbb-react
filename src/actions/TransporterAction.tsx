import React from "react";
import { getAllTransporter, getAllBoxNoAsign } from "../api/user";
export const GET_TRANSPORTER_LIST = "GET_TRANSPORTER_LIST";
export const SET_TRANSPORTER_DATA = "GET_TRANSPORTER_DATA";
export const GET_BOX_NO_ASIGN = "GET_BOX_NO_ASIGN";

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

export const getBoxesListNoAsign = (page, company_id: String | null = null) => {
	return async dispatch => {
		try {
			const response = await getAllBoxNoAsign(page, company_id);
			dispatch({
				type: GET_BOX_NO_ASIGN,
				payload: {
					data: response?.data,
					meta: response?.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_BOX_NO_ASIGN,
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
