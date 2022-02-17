import React from "react";
import { RoomInterfaceState } from "store/Types/RoomTypes";
import { create, destroy, getAll, getById, update } from "../api/rooms";
export const GET_ROOMS_LIST = "GET_ROOMS_LIST";
export const GET_ROOM_DETAIL = "GET_ROOM_DETAIL";
export const CREATE_ROOM = "CREATE_ROOM";
export const ROOMS_ERROR = "ROOMS_ERROR";
export const RESET_ROOM_FORM = "RESET_ROOM_FORM";
export const RESET_ROOM_LIST = "RESET_ROOM_LIST";
export const SET_ROOM_DATA = "SET_ROOM_DATA";
export const UPDATE_ROOM = "UPDATE_ROOM";

let limit = 20;
export const getRoomsList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_ROOMS_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_ROOMS_LIST,
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

export const getRoomDetail = (id: String) => {
	return dispatch => {
		return getById(id)
			.then(function (response) {
				dispatch({
					type: GET_ROOM_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
				return response;
			})
			.catch(function (error) {
				dispatch({
					type: GET_ROOM_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
				return error;
			});
	};
};

export const deleteRoom = id => {
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

export const CreateRoom = async (data: RoomInterfaceState) => {
	console.log(data);
	return async dispatch => {
		try {
			dispatch({
				type: SET_ROOM_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_ROOM,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_ROOM,
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

export const UpdateRoom = async (data: RoomInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_ROOM_DATA,
				payload: data,
			});
			const response = await update(data);
			dispatch({
				type: UPDATE_ROOM,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: UPDATE_ROOM,
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
