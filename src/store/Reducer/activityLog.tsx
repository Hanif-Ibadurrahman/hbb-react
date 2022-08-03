import {
	GET_ACTIVITY_LOG_LIST,
	GET_ACTIVITY_LOG_SUPERADMIN,
	GET_ACTIVITY_LOG_ARCHIVER,
} from "../../actions/ActivityLogAction";

import { ActivityLogsInterfaceState } from "store/Types/ActivityLogTypes";

export const initialState: ActivityLogsInterfaceState = {
	ActivityLogs: [],
	ActivityLog: {
		id: 0,
		log_name: "",
		description: "",
		subject_type: "",
		subject_id: "",
		causer_type: "",
		causer_id: 0,
		properties: "",
		created_at: "",
		updated_at: "",
	},
	ActivityLogsSuperadmin: [],
	ActivityLogsArchiver: [],
	Title: "",
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},

	ErrorActivityLogs: undefined,
};

export default (
	state = initialState,
	{ type, payload },
): ActivityLogsInterfaceState => {
	switch (type) {
		case GET_ACTIVITY_LOG_LIST:
			return {
				...state,
				ActivityLogs: payload?.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorActivityLogs: payload.errorMessage,
			};
		case GET_ACTIVITY_LOG_SUPERADMIN:
			return {
				...state,
				ActivityLogsSuperadmin: payload?.data?.data,
				ErrorActivityLogs: payload.errorMessage,
			};
		case GET_ACTIVITY_LOG_ARCHIVER:
			return {
				...state,
				ActivityLogsArchiver: payload?.data?.data,
				ErrorActivityLogs: payload.errorMessage,
			};
		default:
			return state;
	}
};
