import {
	create,
	destroy,
	getAll,
	getById,
	update,
	filterClassification,
} from "../api/classification";
import { ClassificationInterfaceState } from "store/Types/ClassificationTypes";
export const GET_CLASSIFICATIONS_LIST = "GET_CLASSIFICATIONS_LIST";
export const GET_CLASSIFICATION_DETAIL = "GET_CLASSIFICATION_DETAIL";
export const CREATE_CLASSIFICATION = "CREATE_CLASSIFICATION";
export const CLASSIFICATIONS_ERROR = "CLASSIFICATIONS_ERROR";
export const RESET_CLASSIFICATION_FORM = "RESET_CLASSIFICATION_FORM";
export const RESET_CLASSIFICATION_LIST = "RESET_CLASSIFICATION_LIST";
export const SET_CLASSIFICATION_DATA = "SET_CLASSIFICATION_DATA";
export const UPDATE_CLASSIFICATION = "UPDATE_CLASSIFICATION";
export const FILTER_CLASSIFICATION = "FILTER_CLASSIFICATION";

let limit = 20;

export const getClassificationsList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_CLASSIFICATIONS_LIST,
				payload: {
					data: response?.data,
					meta: response?.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_CLASSIFICATIONS_LIST,
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

export const SearchClassification = async (
	data: ClassificationInterfaceState,
) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_CLASSIFICATION_DATA,
				payload: data,
			});
			const response = await filterClassification(data);
			dispatch({
				type: FILTER_CLASSIFICATION,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: FILTER_CLASSIFICATION,
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

export const getClassificationDetail = (id: String) => {
	return dispatch => {
		return getById(id)
			.then(function (response) {
				dispatch({
					type: GET_CLASSIFICATION_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
				return response;
			})
			.catch(function (error) {
				dispatch({
					type: GET_CLASSIFICATION_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
				return error;
			});
	};
};

export const deleteClassification = id => {
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

export const CreateClassification = async (
	data: ClassificationInterfaceState,
) => {
	console.log(data);
	return async dispatch => {
		try {
			dispatch({
				type: SET_CLASSIFICATION_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_CLASSIFICATION,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_CLASSIFICATION,
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

export const UpdateClassification = async (
	data: ClassificationInterfaceState,
) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_CLASSIFICATION_DATA,
				payload: data,
			});
			const response = await update(data);
			dispatch({
				type: UPDATE_CLASSIFICATION,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: UPDATE_CLASSIFICATION,
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
