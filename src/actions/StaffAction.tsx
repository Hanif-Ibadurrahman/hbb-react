import React from "react";
import { StaffInterfaceState } from "store/Types/StaffTypes";
import { create, destroy, getAll, getAllRole, filterStaff } from "../api/staff";
export const GET_STAFFS_LIST = "GET_STAFF_LIST";
export const GET_ROLE_LIST = "GET_ROLE_LIST";
export const GET_STAFF_DETAIL = "GET_STAFF_DETAIL";
export const CREATE_STAFF = "CREATE_STAFF";
export const STAFFS_ERROR = "STAFFS_ERROR";
export const RESET_STAFF_FORM = "RESET_STAFF_FORM";
export const RESET_STAFF_LIST = "RESET_STAFF_LIST";
export const SET_STAFF_DATA = "SET_STAFF_DATA";
export const UPDATE_STAFF = "UPDATE_STAFF";
export const SEARCH_STAFF = "SEARCH_STAFF";

let limit = 20;
export const getstaffsList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_STAFFS_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_STAFFS_LIST,
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

export const SearchStaff = async (data: StaffInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_STAFF_DATA,
				payload: data,
			});
			const response = await filterStaff(data);
			dispatch({
				type: SEARCH_STAFF,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: SEARCH_STAFF,
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

export const getRoleList = () => {
	return async dispatch => {
		try {
			const response = await getAllRole();
			dispatch({
				type: GET_ROLE_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_ROLE_LIST,
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

export const deleteStaff = id => {
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

export const CreateStaff = async (data: StaffInterfaceState) => {
	console.log(data);
	return async dispatch => {
		try {
			dispatch({
				type: SET_STAFF_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_STAFF,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_STAFF,
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
