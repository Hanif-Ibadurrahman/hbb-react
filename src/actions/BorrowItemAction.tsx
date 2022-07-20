import React from "react";
import {
	BorrowItemInterfaceState,
	BorrowItemsInterfaceState,
} from "store/Types/BorrowItemTypes";
import { create, filterBoxesBorrow, getAll } from "../api/borrowItem";
export const CREATE_BORROW_ITEM = "CREATE_BORROW_ITEM";
export const BORROW_ITEM_ERROR = "BORROW_ITEM_ERROR";
export const RESET_BORROW_FORM = "RESET_BORROW_FORM";
export const RESET_BORROW_LIST = "RESET_BORROW_LIST";
export const SET_BORROW_DATA = "SET_BORROW_DATA";
export const GET_NUMBER_CART = "GET_NUMBER_CART";
export const ADD_CART = "ADD_CART";
export const DELETE_CART = "DELETE_CART";
export const GET_BORROW_LIST = "GET_BORROW_LIST";
export const FILTER_BOXES_BORROW = "FILTER_BOXES_BORROW";

export const getBorrowList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_BORROW_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_BORROW_LIST,
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

export const SearchBoxesBorrow = async (data: BorrowItemInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_BORROW_DATA,
				payload: data,
			});
			const response = await filterBoxesBorrow(data);
			dispatch({
				type: FILTER_BOXES_BORROW,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: FILTER_BOXES_BORROW,
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

export const CreateBorrowItem = async (data: BorrowItemInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_BORROW_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_BORROW_ITEM,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_BORROW_ITEM,
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

export const AddCart = async (data: BorrowItemInterfaceState) => {
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

export const DeleteCart = async (data: BorrowItemInterfaceState) => {
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
