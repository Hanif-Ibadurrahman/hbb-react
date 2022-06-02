import React from "react";
import {
	IndexingDocumentInterfaceState,
	IndexingInterfaceState,
} from "store/Types/IndexingTypes";
import {
	create,
	destroy,
	getAll,
	getById,
	update,
	filterIndexing,
	assignToFolder,
	indexingDocument,
} from "../api/indexing";
export const GET_INDEXING_LIST = "GET_INDEXING_LIST";
export const GET_INDEX_DETAIL = "GET_INDEX_DETAIL";
export const CREATE_INDEX = "CREAT_INDEX";
export const RESET_INDEX_FORM = "RESET_INDEX_FORM";
export const RESET_INDEX_LIST = "RESET_INDEX_LIST";
export const SET_INDEX_DATA = "SET_INDEX_DATA";
export const UPDATE_INDEX = "UPDATE_INDEX";
export const FILTER_INDEXING = "FILTER_INDEXING";
export const GET_NUMBER_CART = "GET_NUMBER_CART";
export const ADD_CART = "ADD_CART";
export const DELETE_CART = "DELETE_CART";
export const GET_NUMBER_CART_ASSIGN = "GET_NUMBER_CART_ASSIGN";
export const ADD_CART_ASSIGN = "ADD_CART_ASSIGN";
export const DELETE_CART_ASSIGN = "DELETE_CART_ASSIGN";
export const PUT_INDEXING_DOCUMENT = "PUT_INDEXING_DOCUMENT";
export const PUT_ASSIGN_DOCUMENT_TO_FOLDER = "PUT_ASSIGN_DOCUMENT_TO_FOLDER";

export const getIndexingList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_INDEXING_LIST,
				payload: {
					data: response?.data,
					meta: response?.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_INDEXING_LIST,
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

export const SearchIndexing = async (data: IndexingInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_INDEX_DATA,
				payload: data,
			});
			const response = await filterIndexing(data);
			dispatch({
				type: FILTER_INDEXING,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: FILTER_INDEXING,
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

export const getIndexingDetail = (id: String) => {
	return dispatch => {
		return getById(id)
			.then(function (response) {
				dispatch({
					type: GET_INDEX_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
				return response;
			})
			.catch(function (error) {
				dispatch({
					type: GET_INDEX_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
				return error;
			});
	};
};

export const deleteIndexing = id => {
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

export const CreateIndexing = async (data: IndexingInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_INDEX_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_INDEX,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_INDEX,
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

export const UpdateIndexing = async (data: IndexingInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_INDEX_DATA,
				payload: data,
			});
			const response = await update(data);
			dispatch({
				type: UPDATE_INDEX,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: UPDATE_INDEX,
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

export const IndexingDocument = async (
	data: IndexingDocumentInterfaceState,
) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_INDEX_DATA,
				payload: data,
			});
			const response = await indexingDocument(data);
			dispatch({
				type: PUT_INDEXING_DOCUMENT,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: PUT_INDEXING_DOCUMENT,
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

export const GetNumberCart = () => {
	return async dispatch => {
		try {
			dispatch({
				type: "GET_NUMBER_CART",
			});
		} catch (error: any) {
			console.log(error);
			throw error;
		}
	};
};

export const AddCart = async (data: IndexingInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: "ADD_CART",
				payload: data,
			});
		} catch (error: any) {
			console.log(error);
			throw error;
		}
	};
};

export const DeleteCart = async (data: IndexingInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: "DELETE_CART",
				payload: data,
			});
		} catch (error: any) {
			console.log(error);
			throw error;
		}
	};
};

export const GetNumberCartAssign = () => {
	return async dispatch => {
		try {
			dispatch({
				type: "GET_NUMBER_CART_ASSIGN",
			});
		} catch (error: any) {
			console.log(error);
			throw error;
		}
	};
};

export const AddCartAssign = async (data: IndexingInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: "ADD_CART_ASSIGN",
				payload: data,
			});
		} catch (error: any) {
			console.log(error);
			throw error;
		}
	};
};

export const DeleteCartAssign = async (data: IndexingInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: "DELETE_CART_ASSIGN",
				payload: data,
			});
		} catch (error: any) {
			console.log(error);
			throw error;
		}
	};
};
