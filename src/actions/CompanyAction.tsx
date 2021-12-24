import React from "react";
import { CompanyInterfaceState } from "store/Types/CompanyTypes";
import { create, destroy, getAll, getById, update } from "../api/companys";
export const GET_COMPANYS_LIST = "GET_COMPANY_LIST";
export const GET_COMPANY_DETAIL = "GET_COMPANY_DETAIL";
export const CREATE_COMPANY = "CREATE_COMPANY";
export const COMPANYS_ERROR = "COMPANYS_ERROR";
export const RESET_COMPANY_FORM = "RESET_COMPANY_FORM";
export const RESET_COMPANY_LIST = "RESET_COMPANY_LIST";
export const SET_COMPANY_DATA = "SET_COMPANY_DATA";
export const UPDATE_COMPANY = "UPDATE_COMPANY";

let limit = 20;

export const getCompanyList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_COMPANYS_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_COMPANYS_LIST,
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

export const getCompanyDetail = (id: String) => {
	return dispatch => {
		return getById(id)
			.then(function (response) {
				dispatch({
					type: GET_COMPANY_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
				return response;
			})
			.catch(function (error) {
				dispatch({
					type: GET_COMPANY_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
				return error;
			});
	};
};

export const deleteCompany = id => {
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

export const CreateCompany = async (data: CompanyInterfaceState) => {
	console.log(data);
	return async dispatch => {
		try {
			dispatch({
				type: SET_COMPANY_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_COMPANY,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_COMPANY,
				payload: {
					data: false,
					errorMessage: error?.message,
				},
			});
			console.log(error?.message);
			throw error;
		}
	};
};

export const UpdateCompany = async (data: CompanyInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_COMPANY_DATA,
				payload: data,
			});
			const response = await update(data);
			dispatch({
				type: UPDATE_COMPANY,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: UPDATE_COMPANY,
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
