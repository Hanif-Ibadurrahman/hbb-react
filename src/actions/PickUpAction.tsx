import React from "react";
import { PickUpItemInterfaceState } from "store/Types/PickUpTypes";
import { create, getAll, getAllPickUp } from "../api/pickUp";
export const CREATE_PICK_UP_ITEM = "CREATE_PICK_UP_ITEM";
export const PICK_UP_ITEM_ERROR = "PICK_UP_ITEM_ERROR";
export const RESET_PICK_UP_FORM = "RESET_PICK_UP_FORM";
export const RESET_PICK_UP_LIST = "RESET_PICK_UP_LIST";
export const SET_PICK_UP_DATA = "SET_PICK_UP_DATA";
export const GET_NUMBER_CART = "GET_NUMBER_CART";
export const ADD_CART = "ADD_CART";
export const DELETE_CART = "DELETE_CART";
export const GET_PICK_UP_LIST = "GET_PICK_UP_LIST";
export const GET_APPROVE_ADMIN_LIST = "GET_APPROVE_ADMIN_LIST";

export const getPickUpList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_PICK_UP_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_PICK_UP_LIST,
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

export const getApproveAdminList = page => {
	return async dispatch => {
		try {
			const response = await getAllPickUp(page);
			dispatch({
				type: GET_APPROVE_ADMIN_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_APPROVE_ADMIN_LIST,
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

export const CreatePickUpItem = async (data: PickUpItemInterfaceState) => {
	console.log("data create", data);
	return async dispatch => {
		try {
			dispatch({
				type: SET_PICK_UP_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_PICK_UP_ITEM,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_PICK_UP_ITEM,
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

export const AddCart = async (data: PickUpItemInterfaceState) => {
	console.log("Add cart action", data);
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

export const DeleteCart = async (data: PickUpItemInterfaceState) => {
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
