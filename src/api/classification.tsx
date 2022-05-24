import { identity } from "lodash";
import { ClassificationInterfaceState } from "store/Types/ClassificationTypes";
import api from "./dox";

export const getAll = async params => {
	return api
		.get("/classifications?type=fasilitatif")
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

// export const getById = async (id: String) => {
// 	return api.get(`/classifications/${id}`);
// };
