import { getAll } from "../api/activityLog";
export const GET_ACTIVITY_LOG_LIST = "GET_ACTIVITY_LOG_LIST";

export const getActivityLogList = page => {
	return async dispatch => {
		try {
			const response = await getAll(page);
			dispatch({
				type: GET_ACTIVITY_LOG_LIST,
				payload: {
					data: response?.data,
					meta: response?.meta,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_ACTIVITY_LOG_LIST,
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
