import { identity } from "lodash";
import { UserInterfaceState } from "store/Types/UserTypes";
import api from "./dox";

export const getAllTransporter = async params => {
	return api
		.get(`/users?role=transporter&page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllArchiver = async params => {
	return api
		.get(`/users?role=archiver&page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
