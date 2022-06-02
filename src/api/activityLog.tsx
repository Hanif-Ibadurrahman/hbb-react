import { identity } from "lodash";
import { BoxInterfaceState } from "store/Types/BoxTypes";
import { ActivityLogInterfaceState } from "store/Types/ActivityLogTypes";
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
