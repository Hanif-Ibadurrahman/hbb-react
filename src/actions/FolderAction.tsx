import React from "react";
import { FolderInterfaceState } from "store/Types/FolderTypes";
import {
	create,
	destroy,
	getAll,
	getById,
	update,
	filterFolders,
	getAllNotPage,
} from "../api/folder";
export const GET_FOLDERS_LIST = "GET_FOLDERS_LIST";
export const GET_FOLDER_DETAIL = "GET_FOLDER_DETAIL";
export const CREATE_FOLDER = "CREAT_FOLDER";
export const FOLDERS_ERROR = "FOLDERS_ERROR";
export const RESET_FOLDER_FORM = "RESET_FOLDER_FORM";
export const RESET_FOLDER_LIST = "RESET_FOLDER_LIST";
export const SET_FOLDER_DATA = "SET_FOLDER_DATA";
export const UPDATE_FOLDER = "UPDATE_FOLDER";
export const FILTER_FOLDER = "FILTER_FOLDER";
export const GET_FOLDERS_NOT_PAGE = "GET_FOLDERS_NOT_PAGE";

export const getFoldersList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_FOLDERS_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_FOLDERS_LIST,
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

export const getFoldersNotPage = page => {
	return async dispatch => {
		try {
			const response = await getAllNotPage(page);
			dispatch({
				type: GET_FOLDERS_NOT_PAGE,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_FOLDERS_NOT_PAGE,
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

export const SearchFolders = async (data: FolderInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_FOLDER_DATA,
				payload: data,
			});
			const response = await filterFolders(data);
			dispatch({
				type: FILTER_FOLDER,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: FILTER_FOLDER,
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

export const getFolderDetail = (id: String) => {
	return dispatch => {
		return getById(id)
			.then(function (response) {
				dispatch({
					type: GET_FOLDER_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
				return response;
			})
			.catch(function (error) {
				dispatch({
					type: GET_FOLDER_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
				return error;
			});
	};
};

export const deleteFolder = id => {
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

export const CreateFolder = async (data: FolderInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_FOLDER_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_FOLDER,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_FOLDER,
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

export const UpdateFolder = async (data: FolderInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_FOLDER_DATA,
				payload: data,
			});
			const response = await update(data);
			dispatch({
				type: UPDATE_FOLDER,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: UPDATE_FOLDER,
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
