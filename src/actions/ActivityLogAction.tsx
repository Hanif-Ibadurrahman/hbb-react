import { ActivitiLogsArchiver } from "store/Types/ActivityLogTypes";
import {
	getAll,
	getActivityLogsArchiver,
	getActivityLogsSuperAdmin,
	getDashboardSummary,
} from "../api/activityLog";
export const GET_ACTIVITY_LOG_LIST = "GET_ACTIVITY_LOG_LIST";
export const GET_ACTIVITY_LOG_SUPERADMIN = "GET_ACTIVITY_LOG_SUPERADMIN";
export const GET_ACTIVITY_LOG_ARCHIVER = "GET_ACTIVITY_LOG_ARCHIVER";
export const SET_ACTIVITY_LOGS = "SET_ACTIVITY_LOGS";
export const GET_DASHBOARD_SUMMARY = "GET_DASHBOARD_SUMMARY";

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

export const GetActivityLogsSuperAdmin = (data: String) => {
	return dispatch => {
		return getActivityLogsSuperAdmin(data)
			.then(function (response) {
				dispatch({
					type: GET_ACTIVITY_LOG_SUPERADMIN,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
				return response;
			})
			.catch(function (error) {
				dispatch({
					type: GET_ACTIVITY_LOG_SUPERADMIN,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
				return error;
			});
	};
};

export const GetActivityLogsArchiver = () => {
	return dispatch => {
		return getActivityLogsArchiver()
			.then(function (response) {
				dispatch({
					type: GET_ACTIVITY_LOG_ARCHIVER,
					payload: {
						data: response.data,
						errorMessage: false,
					},
				});
				return response;
			})
			.catch(function (error) {
				dispatch({
					type: GET_ACTIVITY_LOG_ARCHIVER,
					payload: {
						data: false,
						errorMessage: error.message,
					},
				});
				return error;
			});
	};
};

export const getSummaryDashboard = (
	company_id: String | null = null,
	area_id: String | null = null,
) => {
	return async dispatch => {
		try {
			const response = await getDashboardSummary(company_id, area_id);
			dispatch({
				type: GET_DASHBOARD_SUMMARY,
				payload: {
					data: response?.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: GET_DASHBOARD_SUMMARY,
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
