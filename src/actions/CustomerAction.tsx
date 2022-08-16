import React from "react";
import { CustomerInterfaceState } from "store/Types/CustomerTypes";
import { create, destroy, getAll, update, getById } from "../api/customer";
export const GET_CUSTOMERS_LIST = "GET_CUSTOMERS_LIST";
export const GET_CUSTOMER_DETAIL = "GET_CUSTOMER_DETAIL";
export const CREATE_CUSTOMER = "CREATE_CUSTOMER";
export const CUSTOMERS_ERROR = "CUSTOMERS_ERROR";
export const RESET_CUSTOMER_FORM = "RESET_CUSTOMER_FORM";
export const RESET_CUSTOMER_LIST = "RESET_CUSTOMER_LIST";
export const SET_CUSTOMER_DATA = "SET_CUSTOMER_DATA";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";

export const getCustomersList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_CUSTOMERS_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_CUSTOMERS_LIST,
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

export const getCustomerDetail = (id: String) => {
	return dispatch => {
		return getById(id)
			.then(function (response) {
				dispatch({
					type: GET_CUSTOMER_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
				return response;
			})
			.catch(function (error) {
				dispatch({
					type: GET_CUSTOMER_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
				return error;
			});
	};
};

export const deleteCustomer = id => {
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

export const CreateCustomer = async (data: CustomerInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_CUSTOMER_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_CUSTOMER,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_CUSTOMER,
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

export const UpdateCustomer = async (data: CustomerInterfaceState) => {
	console.log(data, "datadistaffaction");
	return async dispatch => {
		try {
			dispatch({
				type: SET_CUSTOMER_DATA,
				payload: data,
			});
			const response = await update(data);
			dispatch({
				type: UPDATE_CUSTOMER,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: UPDATE_CUSTOMER,
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
