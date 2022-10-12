import React from "react";
import { CabinetInterfaceState } from "store/Types/CabinetTypes";
import {
	create,
	destroy,
	filterCabinet,
	getAll,
	getById,
	update,
} from "../api/cabinets";
export const GET_CABINETS_LIST = "GET_CABINETS_LIST";
export const GET_CABINET_DETAIL = "GET_CABINET_DETAIL";
export const CREATE_CABINET = "CREAT_CABINET";
export const CABINETS_ERROR = "CABINETS_ERROR";
export const RESET_CABINET_FORM = "RESET_CABINET_FORM";
export const RESET_CABINET_LIST = "RESET_CABINET_LIST";
export const SET_CABINET_DATA = "SET_CABINET_DATA";
export const UPDATE_CABINET = "UPDATE_CABINET";
export const FILTER_CABINET = "FILTER_CABINET";

let limit = 20;

export const getCabinetsList = (page, company_id: String | null = null) => {
	return async dispatch => {
		try {
			const response = await getAll(page, company_id);
			dispatch({
				type: GET_CABINETS_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_CABINETS_LIST,
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

export const SearchCabinet = async (data: CabinetInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_CABINET_DATA,
				payload: data,
			});
			const response = await filterCabinet(data);
			dispatch({
				type: FILTER_CABINET,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: FILTER_CABINET,
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

export const getCabinetDetail = (id: String) => {
	return dispatch => {
		return getById(id)
			.then(function (response) {
				dispatch({
					type: GET_CABINET_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
				return response;
			})
			.catch(function (error) {
				dispatch({
					type: GET_CABINET_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
				return error;
			});
	};
};

export const deleteCabinet = id => {
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

export const CreateCabinet = async (data: CabinetInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_CABINET_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_CABINET,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_CABINET,
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

export const UpdateCabinet = async (data: CabinetInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_CABINET_DATA,
				payload: data,
			});
			const response = await update(data);
			dispatch({
				type: UPDATE_CABINET,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: UPDATE_CABINET,
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
