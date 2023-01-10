import React from "react";
import { AreaInterfaceState } from "store/Types/AreaTypes";
import {
	create,
	destroy,
	getAll,
	getById,
	update,
	filterArea,
} from "../api/areas";
export const GET_AREAS_LIST = "GET_AREAS_LIST";
export const GET_AREA_DETAIL = "GET_AREA_DETAIL";
export const CREATE_AREA = "CREAT_AREA";
export const AREAS_ERROR = "AREAS_ERROR";
export const RESET_AREA_FORM = "RESET_AREA_FORM";
export const RESET_AREA_LIST = "RESET_AREA_LIST";
export const SET_AREA_DATA = "SET_AREA_DATA";
export const UPDATE_AREA = "UPDATE_AREA";
export const FILTER_AREA = "FILTER_AREA";

let limit = 20;

export const getAreasList = (page, company_id: String | null = null) => {
	return async dispatch => {
		try {
			const response = await getAll(page, company_id);
			dispatch({
				type: GET_AREAS_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_AREAS_LIST,
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

export const SearchArea = async (data: AreaInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_AREA_DATA,
				payload: data,
			});
			const response = await filterArea(data);
			dispatch({
				type: FILTER_AREA,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: FILTER_AREA,
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

export const getAreaDetail = (id: String) => {
	return dispatch => {
		return getById(id)
			.then(function (response) {
				dispatch({
					type: GET_AREA_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
				return response;
			})
			.catch(function (error) {
				dispatch({
					type: GET_AREA_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
				return error;
			});
	};
};

export const deleteArea = id => {
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

export const CreateArea = async (data: AreaInterfaceState) => {
	console.log(data);
	return async dispatch => {
		try {
			dispatch({
				type: SET_AREA_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_AREA,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_AREA,
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

export const UpdateArea = async (data: AreaInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_AREA_DATA,
				payload: data,
			});
			const response = await update(data);
			dispatch({
				type: UPDATE_AREA,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: UPDATE_AREA,
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
