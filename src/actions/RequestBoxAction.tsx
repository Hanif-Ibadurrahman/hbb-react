import {
	ApprovalInterfaceState,
	ApprovalOperationInterfaceState,
	RequestBoxInterfaceState,
} from "store/Types/RequestBoxTypes";
import {
	create,
	update,
	getAll,
	getById,
	approval_admin,
	getAllConfirmed,
	reject_operation,
	approval_operation,
} from "../api/requestBox";
export const GET_REQUEST_BOXES_LIST = "GET_BOXES_LIST";
export const GET_REQUEST_BOX_DETAIL = "GET_BOX_DETAIL";
export const CREATE_REQUEST_BOX = "CREATE_REQUEST_BOX";
export const REQUEST_BOXES_ERROR = "BOXES_ERROR";
export const RESET_REQUEST_BOX_FORM = "RESET_REQUEST_BOX_FORM";
export const RESET_REQUEST_BOX_LIST = "RESET_REQUEST_BOX_LIST";
export const SET_REQUEST_BOX_DATA = "SET_REQUEST_BOX_DATA";
export const UPDATE_REQUEST_BOX = "UPDATE_REQUEST_BOX";
export const APPROVAL_ADMIN = "APPROVAL_ADMIN";
export const GET_CONFIRMED_ADMIN = "GET_CONFIRMED_ADMIN";
export const REJECT_OPERTAION = "REJECT_OPERATION";
export const APPROVAL_OPERATION = "APPROVAL_OPERATION";

let limit = 20;

export const getRequestBoxesList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_REQUEST_BOXES_LIST,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_REQUEST_BOXES_LIST,
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

export const getRequestBoxDetail = (id: String) => {
	return dispatch => {
		return getById(id)
			.then(function (response) {
				dispatch({
					type: GET_REQUEST_BOX_DETAIL,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
				return response;
			})
			.catch(function (error) {
				dispatch({
					type: GET_REQUEST_BOX_DETAIL,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
				return error;
			});
	};
};

export const CreateRequestBox = async (data: RequestBoxInterfaceState) => {
	console.log(data);
	return async dispatch => {
		try {
			dispatch({
				type: SET_REQUEST_BOX_DATA,
				payload: data,
			});
			const response = await create(data);
			dispatch({
				type: CREATE_REQUEST_BOX,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: CREATE_REQUEST_BOX,
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

export const UpdateRequestBox = async (data: RequestBoxInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_REQUEST_BOX_DATA,
				payload: data,
			});
			const response = await update(data);
			dispatch({
				type: UPDATE_REQUEST_BOX,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: UPDATE_REQUEST_BOX,
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

export const ApprovalAdmin = async (data: ApprovalInterfaceState) => {
	return async dispatch => {
		try {
			const response = await approval_admin(data);
			dispatch({
				type: APPROVAL_ADMIN,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
		} catch (error: any) {
			dispatch({
				type: APPROVAL_ADMIN,
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

export const getAllConfirmedAdmin = page => {
	return async dispatch => {
		try {
			const response = await getAllConfirmed(page);
			dispatch({
				type: GET_CONFIRMED_ADMIN,
				payload: {
					data: response.data,
					meta: response.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_CONFIRMED_ADMIN,
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

export const RejectOpertaion = async (data: ApprovalInterfaceState) => {
	return async dispatch => {
		try {
			const response = await reject_operation(data);
			dispatch({
				type: REJECT_OPERTAION,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
		} catch (error: any) {
			dispatch({
				type: REJECT_OPERTAION,
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
export const ApprovalOpertaion = async (
	data: ApprovalOperationInterfaceState,
) => {
	return async dispatch => {
		try {
			const response = await approval_operation(data);
			dispatch({
				type: APPROVAL_OPERATION,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
		} catch (error: any) {
			dispatch({
				type: APPROVAL_OPERATION,
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
