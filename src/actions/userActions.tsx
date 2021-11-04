import React from "react";
import api from "../api/dox";
import PaginatedBoxResponse from "app/pages/Interface/box";

export const GET_BOXES_LIST = "GET_BOXES_LIST";
export const BOXES_ERROR = "BOXES_ERROR";

let limit = 20;

export const getBoxesList = () => {
	return dispatch => {
		api
			.get<PaginatedBoxResponse>(`/boxes?page=1&limit=${limit}`)
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

export const deleteBoxes = id => {
	return dispatch => {
		api
			.delete(`/boxes` + id)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
};
