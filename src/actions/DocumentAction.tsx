import React from "react";
import { DocumentInterfaceState } from "store/Types/DocumentTypes";
import {
	create,
	destroy,
	getAll,
	getById,
	update,
	filter,
} from "../api/documents";
export const GET_DOCUMENTS_FILTER = "GET_DOCUMENT_FILTER";
export const GET_DOCUMENTS_LIST = "GET_DOCUMENTS_LIST";
export const GET_DOCUMENT_DETAIL = "GET_DOCUMENT_DETAIL";
export const CREATE_DOCUMENT = "CREAT_DOCUMENT";
export const EDIT_DOCUMENT = "GET_DOCUMENTS_LIST";
export const DOCUMENTS_ERROR = "DOCUMENTS_ERROR";
export const RESET_DOCUMENT_FORM = "RESET_DOCUMENT_FORM";
export const RESET_DOCUMENT_LIST = "RESET_DOCUMENT_LIST";
export const SET_DOCUMENT_DATA = "SET_DOCUMENT_DATA";
export const UPDATE_DOCUMENT = "UPDATE_DOCUMENT";

let limit = 20;

export const filterData = async (data: DocumentInterfaceState) => {
	console.log("data redux >>>>");

	return async dispatch => {
		try {
			dispatch({
				type: SET_DOCUMENT_DATA,
				payload: data,
			});
		} catch (error: any) {
			dispatch({
				type: GET_DOCUMENTS_FILTER,
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

export const getDocumentsList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_DOCUMENTS_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_DOCUMENTS_LIST,
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

export const getDocumentDetail = (id: String) => {
	return dispatch => {
		return getById(id)
			.then(function (response) {
				dispatch({
					type: GET_DOCUMENT_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
				return response;
			})
			.catch(function (error) {
				dispatch({
					type: GET_DOCUMENT_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
				return error;
			});
	};
};

export const deleteDocument = id => {
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

export const CreateDocument = async (data: DocumentInterfaceState) => {
	console.log(data);
	return async dispatch => {
		try {
			dispatch({
				type: SET_DOCUMENT_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_DOCUMENT,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_DOCUMENT,
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

export const UpdateDcoument = async (data: DocumentInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_DOCUMENT_DATA,
				payload: data,
			});
			const response = await update(data);
			dispatch({
				type: UPDATE_DOCUMENT,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: UPDATE_DOCUMENT,
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
