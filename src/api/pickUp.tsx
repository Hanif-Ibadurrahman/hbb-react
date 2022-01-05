import { identity } from "lodash";
import { PickUpItemInterfaceState } from "store/Types/PickUpTypes";
import api from "./dox";

export const create = async (data: PickUpItemInterfaceState) => {
	let payload = {
		delivered_at: data.delivered_at,
		delivery_method: data.delivery_method,
		box_codes: data.box_codes,
	};
	return api.post("/pickup", payload);
};

export const getAll = async params => {
	return api
		.get(`/boxes?status=delivered&page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllPickUp = async params => {
	return api
		.get(`/requests?type=pickup-box&page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
