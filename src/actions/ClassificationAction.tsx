import { getAll } from "../api/classification";
export const GET_CLASSIFICATION_LIST = "GET_CLASSIFICATION_LIST";
export const GET_CLASSIFICATION_DETAIL = "GET_CLASSIFICATION_DETAIL";

export const getClassificationList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_CLASSIFICATION_LIST,
				payload: {
					data: response?.data,
					meta: response?.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_CLASSIFICATION_LIST,
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

// export const getClassificationDetail = (id: String) => {
// 	return dispatch => {
// 		return getById(id)
// 			.then(function (response) {
// 				dispatch({
// 					type: GET_CLASSIFICATION_DETAIL,
// 					payload: {
// 						data: response.data,
// 						errorMessage: false,
// 					},
// 				});
// 				return response;
// 			})
// 			.catch(function (error) {
// 				dispatch({
// 					type: GET_CLASSIFICATION_DETAIL,
// 					payload: {
// 						data: false,
// 						errorMessage: error.message,
// 					},
// 				});
// 				return error;
// 			});
// 	};
// };
