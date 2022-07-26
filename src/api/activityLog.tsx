import moment from "moment";
import { ActivitiLogsArchiver } from "store/Types/ActivityLogTypes";
import api from "./dox";

export const getAll = async params => {
	return api
		.get(`/activity-logs?page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getActivityLogsSuperAdmin = async (data: String) => {
	var now = moment().format("YYYY-MM-DD");
	var previous = moment().subtract(5, "days").format("YYYY-MM-DD");
	return api.get(
		`/activity-logs/summary/input-document?area_id=${data}&start_date=2022-07-12&end_date=2022-07-16`,
	);
};

export const getActivityLogsArchiver = () => {
	const id_user = localStorage.getItem("IdUser");
	var now = moment().format("YYYY-MM-DD");
	var prev = moment().subtract(5, "days").format("YYYY-MM-DD");
	return api.get(
		`/activity-logs/summary/input-document/user?id=${id_user}&start_date=${prev}&end_date=${now}`,
	);
};
