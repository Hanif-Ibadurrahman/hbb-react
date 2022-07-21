import React from "react";
import {
	ReturnItemInterfaceState,
	ReturnItemsInterfaceState,
} from "store/Types/ReturnItemTypes";
import { create, getAll } from "../api/returnItem";
export const CREATE_RETURN_ITEM = "CREATE_RETURN_ITEM";
export const RETURN_ITEM_ERROR = "RETURN_ITEM_ERROR";
export const RESET_RETURN_FORM = "RESET_RETURN_FORM";
export const RESET_RETURN_LIST = "RESET_RETURN_LIST";
export const SET_RETURN_DATA = "SET_RETURN_DATA";
export const GET_NUMBER_CART = "GET_NUMBER_CART";
export const ADD_CART = "ADD_CART";
export const ADD_CART_ALL = "ADD_CART_ALL";
export const DELETE_CART = "DELETE_CART";
export const GET_RETURN_LIST = "GET_RETURN_LIST";

export const getReturnList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_RETURN_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_RETURN_LIST,
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

export const CreateReturnItem = async (data: ReturnItemInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_RETURN_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_RETURN_ITEM,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_RETURN_ITEM,
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

export const GetNumberCart = () => {
	return async dispatch => {
		try {
			dispatch({
				type: "GET_NUMBER_CART",
			});
		} catch (error: any) {
			console.log(error);
			throw error;
		}
	};
};

export const AddCart = async (data: ReturnItemInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: "ADD_CART",
				payload: data,
			});
		} catch (error: any) {
			console.log(error);
			throw error;
		}
	};
};

export const AddCartAll = async (data: any[]) => {
	return async dispatch => {
		try {
			dispatch({
				type: "ADD_CART_ALL",
				payload: data,
			});
		} catch (error: any) {
			console.log(error);
			throw error;
		}
	};
};

export const DeleteCart = async (data: ReturnItemInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: "DELETE_CART",
				payload: data,
			});
		} catch (error: any) {
			console.log(error);
			throw error;
		}
	};
};
