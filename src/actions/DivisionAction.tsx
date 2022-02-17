import React from "react";
import { DivisionInterfaceState } from "store/Types/DivisionTypes";
import { create, destroy, getAll, getById, update } from "../api/divisions";
export const GET_DIVISIONS_LIST = "GET_DIVISIONS_LIST";
export const GET_DIVISION_DETAIL = "GET_DIVISION_DETAIL";
export const CREATE_DIVISION = "CREATE_DIVISION";
export const DIVISIONS_ERROR = "DIVISIONS_ERROR";
export const RESET_DIVISION_FORM = "RESET_DIVISION_FORM";
export const RESET_DIVISION_LIST = "RESET_DIVISION_LIST";
export const SET_DIVISION_DATA = "SET_DIVISION_DATA";
export const UPDATE_DIVISION = "UPDATE_DIVISION";

let limit = 20;

export const getDivisionsList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_DIVISIONS_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_DIVISIONS_LIST,
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

export const getDivisionDetail = (id: String) => {
	return dispatch => {
		return getById(id)
			.then(function (response) {
				dispatch({
					type: GET_DIVISION_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
				return response;
			})
			.catch(function (error) {
				dispatch({
					type: GET_DIVISION_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
				return error;
			});
	};
};

export const deleteDivision = id => {
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

export const CreateDivision = async (data: DivisionInterfaceState) => {
	console.log(data);
	return async dispatch => {
		try {
			dispatch({
				type: SET_DIVISION_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_DIVISION,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_DIVISION,
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

export const UpdateDivision = async (data: DivisionInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_DIVISION_DATA,
				payload: data,
			});
			const response = await update(data);
			dispatch({
				type: UPDATE_DIVISION,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: UPDATE_DIVISION,
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
