import React from "react";
import api from "../api/dox";
import PaginatedBoxResponse from "app/pages/Interface/box";
export const GET_BOXES_LIST = "GET_BOXES_LIST";
export const GET_BOX_DETAIL = "GET_BOX_DETAIL";
export const CREATE_BOX = "CREAT_BOX";
export const EDIT_BOX = "GET_BOXES_LIST";
export const BOXES_ERROR = "BOXES_ERROR";

let limit = 20;

export const getBoxesList = page => {
	return dispatch => {
		api
			.get<PaginatedBoxResponse>(`/boxes?page=${page}&limit=${limit}`)
			.then(function (response) {
				dispatch({
					type: GET_BOXES_LIST,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
			})
			.catch(function (error) {
				dispatch({
					type: GET_BOXES_LIST,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
			});
	};
};

export const getBoxDetail = key => {
	return dispatch => {
		api
			.get("boxes/" + key)
			.then(function (response) {
				dispatch({
					type: GET_BOX_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
			})
			.catch(function (error) {
				dispatch({
					type: GET_BOX_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
			});
	};
};

export const deleteBox = key => {
	return dispatch => {
		api
			.delete(`boxes/` + key)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
};

export const CreateBox = data => {
	return dispatch => {
		api
			.post("boxes/", data)
			.then(function (response) {
				console.log(response);
				dispatch({
					type: CREATE_BOX,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
			})
			.catch(function (error) {
				dispatch({
					type: CREATE_BOX,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
			});
	};
};
