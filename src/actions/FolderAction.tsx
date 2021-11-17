import React from "react";
import api from "../api/dox";
import PaginatedFolderResponse from "app/pages/Interface/folder";
export const GET_FOLDERS_LIST = "GET_FOLDERS_LIST";
export const GET_FOLDER_DETAIL = "GET_FOLDER_DETAIL";
export const FOLDERS_ERROR = "FOLDERS_ERROR";

let limit = 20;
export const getFoldersList = page => {
	return dispatch => {
		api
			.get<PaginatedFolderResponse>(`/folders?page=${page}&limit=${limit}`)
			.then(function (response) {
				dispatch({
					type: GET_FOLDERS_LIST,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
			})
			.catch(function (error) {
				dispatch({
					type: GET_FOLDERS_LIST,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
			});
	};
};

export const getFolderDetail = key => {
	return dispatch => {
		api
			.get("/folders/" + key)
			.then(function (response) {
				dispatch({
					type: GET_FOLDER_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
			})
			.catch(function (error) {
				dispatch({
					type: GET_FOLDER_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
			});
	};
};

export const deleteFolder = key => {
	return dispatch => {
		api
			.delete(`folders/` + key)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
};
