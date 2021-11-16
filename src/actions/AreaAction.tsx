import React from "react";
import api from "../api/dox";
import PaginatedAreaResponse from "app/pages/Interface/area";
export const GET_AREAS_LIST = "GET_AREAS_LIST";
export const EDIT_BOX = "GET_AREAS_LIST";
export const AREAS_ERROR = "AREAS_ERROR";

let limit = 20;
export const getAreasList = page => {
	return dispatch => {
		api
			.get<PaginatedAreaResponse>(`/areas?page=${page}&limit=${limit}`)
			.then(function (response) {
				dispatch({
					type: GET_AREAS_LIST,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
			})
			.catch(function (error) {
				dispatch({
					type: GET_AREAS_LIST,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
			});
	};
};
