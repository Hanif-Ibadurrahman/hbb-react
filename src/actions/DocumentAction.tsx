import React from "react";
import api from "../api/dox";
import PaginatedDocumentResponse from "app/pages/Interface/document";
export const GET_DOCUMENTS_LIST = "GET_DOCUMENTS_LIST";
export const DOCUMENTS_ERROR = "DOCUMENTS_ERROR";

let limit = 20;
export const getDocumentsList = page => {
	return dispatch => {
		api
			.get<PaginatedDocumentResponse>(`/documents?page=${page}&limit=${limit}`)
			.then(function (response) {
				dispatch({
					type: GET_DOCUMENTS_LIST,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
			})
			.catch(function (error) {
				dispatch({
					type: GET_DOCUMENTS_LIST,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
			});
	};
};
