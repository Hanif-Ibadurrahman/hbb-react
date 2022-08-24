import React from "react";
import { CarInterfaceState } from "store/Types/CarTypes";
import {
	create,
	destroy,
	filterCar,
	getAll,
	getById,
	update,
} from "../api/cars";
export const GET_CARS_LIST = "GET_CARS_LIST";
export const GET_CAR_DETAIL = "GET_CAR_DETAIL";
export const CREATE_CAR = "CREAT_CAR";
export const EDIT_CAR = "GET_CARS_LIST";
export const CARS_ERROR = "CARS_ERROR";
export const RESET_CAR_FORM = "RESET_CAR_FORM";
export const RESET_CAR_LIST = "RESET_CAR_LIST";
export const SET_CAR_DATA = "SET_CAR_DATA";
export const UPDATE_CAR = "UPDATE_CAR";
export const FILTER_CAR = "FILTER_CAR";

export const getCarsList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_CARS_LIST,
				payload: {
					data: response?.data,
					meta: response?.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_CARS_LIST,
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

export const SearchCar = async (data: CarInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_CAR_DATA,
				payload: data,
			});
			const response = await filterCar(data);
			dispatch({
				type: FILTER_CAR,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: FILTER_CAR,
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

export const getCarDetail = (id: String) => {
	return dispatch => {
		return getById(id)
			.then(function (response) {
				dispatch({
					type: GET_CAR_DETAIL,
					payload: {
						data: response?.data,
						errorMessage: false,
					},
				});
				return response;
			})
			.catch(function (error) {
				dispatch({
					type: GET_CAR_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
				return error;
			});
	};
};

export const deleteCar = id => {
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

export const CreateCar = async (data: CarInterfaceState) => {
	console.log(data);
	return async dispatch => {
		try {
			dispatch({
				type: SET_CAR_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_CAR,
				payload: {
					data: response?.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_CAR,
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

export const UpdateCar = async (data: CarInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_CAR_DATA,
				payload: data,
			});
			const response = await update(data);
			dispatch({
				type: UPDATE_CAR,
				payload: {
					data: response?.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: UPDATE_CAR,
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
