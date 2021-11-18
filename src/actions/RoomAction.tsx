import React from "react";
import api from "../api/dox";
import PaginatedRoomResponse from "app/pages/Interface/room";
export const GET_ROOMS_LIST = "GET_ROOMS_LIST";
export const GET_ROOMS_DETAIL = "GET_ROOMS_DETAIL";
export const ROOMS_ERROR = "ROOMS_ERROR";

let limit = 20;
export const getRoomsList = page => {
	return dispatch => {
		api
			.get<PaginatedRoomResponse>(`/rooms?page=${page}&limit=${limit}`)
			.then(function (response) {
				dispatch({
					type: GET_ROOMS_LIST,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
			})
			.catch(function (error) {
				dispatch({
					type: GET_ROOMS_LIST,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
			});
	};
};

export const getRoomDetail = id => {
	return dispatch => {
		api
			.get("rooms/" + id)
			.then(function (response) {
				dispatch({
					type: GET_ROOMS_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
			})
			.catch(function (error) {
				dispatch({
					type: GET_ROOMS_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
			});
	};
};

export const deleteRoom = id => {
	return dispatch => {
		api
			.delete(`rooms/` + id)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
};
