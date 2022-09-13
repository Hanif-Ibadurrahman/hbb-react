import moment from "moment";
import { ActivitiLogsArchiver } from "store/Types/ActivityLogTypes";
import api from "./dox";

export const getAll = async params => {
	return api
		.get(`/activity-logs?page=${params}`)
		.then(res => {
			if (res.status === 401) {
				return localStorage.clear();
			} else {
				return res.data;
			}
		})
		.catch(error => {
			return error;
		});
};

export const getActivityLogsSuperAdmin = async (data: String) => {
	return api.get(`/activity-logs/summary/input-document?area_id=${data}`);
};

export const getActivityLogsArchiver = () => {
	const id_user = localStorage.getItem("IdUser");
	return api.get(`/activity-logs/summary/input-document/user?id=${id_user}`);
};
