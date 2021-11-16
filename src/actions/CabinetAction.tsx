import React from "react";
import api from "../api/dox";
import PaginatedCabinetResponse from "app/pages/Interface/cabinet";
export const GET_CABINETS_LIST = "GET_CABINETS_LIST";
export const GET_CABINET_DETAIL = "GET_CABINET_DETAIL";
export const CABINETS_ERROR = "CABINETS_ERROR";

let limit = 20;
export const getCabinetsList = page => {
	return dispatch => {
		api
			.get<PaginatedCabinetResponse>(`/cabinets?page=${page}&limit=${limit}`)
			.then(function (response) {
				dispatch({
					type: GET_CABINETS_LIST,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
			})
			.catch(function (error) {
				dispatch({
					type: GET_CABINETS_LIST,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
			});
	};
};

export const getCabinetDetail = key => {
	return dispatch => {
		api
			.get("/cabinets/" + key)
			.then(function (response) {
				dispatch({
					type: GET_CABINET_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
			})
			.catch(function (error) {
				dispatch({
					type: GET_CABINET_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
			});
	};
};
