import React from "react";
import { BoxInterfaceState } from "store/Types/BoxTypes";
import { create, destroy, getAll, getById, update } from "../api/boxes";
export const GET_BOXES_LIST = "GET_BOXES_LIST";
export const GET_BOX_DETAIL = "GET_BOX_DETAIL";
export const CREATE_BOX = "CREAT_BOX";
export const EDIT_BOX = "GET_BOXES_LIST";
export const BOXES_ERROR = "BOXES_ERROR";
export const RESET_BOX_FORM = "RESET_BOX_FORM";
export const RESET_BOX_LIST = "RESET_BOX_LIST";
export const SET_BOX_DATA = "SET_BOX_DATA";
export const UPDATE_BOX = "UPDATE_BOX";

let limit = 20;

export const getBoxesList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_BOXES_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_BOXES_LIST,
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

export const getBoxDetail = (id: String) => {
	return dispatch => {
		return getById(id)
			.then(function (response) {
				dispatch({
					type: GET_BOX_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
				return response;
			})
			.catch(function (error) {
				dispatch({
					type: GET_BOX_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
				return error;
			});
	};
};

export const deleteBox = id => {
	return dispatch => {
		destroy(id)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
};

export const CreateBox = async (data: BoxInterfaceState) => {
	console.log(data);
	return async dispatch => {
		try {
			dispatch({
				type: SET_BOX_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_BOX,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_BOX,
				payload: {
					data: false,
					errorMessage: error?.message,
				},
			});
			console.log(error);
			throw error;
		}
	};
};

export const UpdateBox = async (data: BoxInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_BOX_DATA,
				payload: data,
			});
			const response = await update(data);
			dispatch({
				type: UPDATE_BOX,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: UPDATE_BOX,
				payload: {
					data: false,
					errorMessage: error?.message,
				},
			});
			console.log(error);
			throw error;
		}
		// dispatch({
		// 	type: SET_BOX_DATA,
		// 	payload: data,
		// });
		// return update(data)
		// 	.then(response => {
		// 		dispatch({
		// 			type: UPDATE_BOX,
		// 			payload: {
		// 				data: response.data,
		// 				errorMessage: false,
		// 			},
		// 		});
		// 		return response;
		// 	})
		// 	.catch(error => {
		// 		dispatch({
		// 			type: UPDATE_BOX,
		// 			payload: {
		// 				data: false,
		// 				errorMessage: error.message,
		// 			},
		// 		});
		// 		console.log(error);
		// 		throw error;
		// 	});
	};
};
