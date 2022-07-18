import { identity } from "lodash";
import { BorrowItemInterfaceState } from "store/Types/BorrowItemTypes";
import { BoxInterfaceState } from "store/Types/BoxTypes";
import api from "./dox";

export const create = async (data: BorrowItemInterfaceState) => {
	let payload = {
		delivered_at: data.delivered_at,
		note: data.note,
		box_codes: data.box_codes,
		delivery_method: data.delivery_method,
	};
	return api.post("/borrow", payload);
};

export const getAll = async params => {
	return api
		.get(`/boxes?status=stored-on-cabinet-slot&page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const filterBoxes = async (data: BoxInterfaceState) => {
	let filter = {
		code: data.code_box,
	};

	return api
		.get(`boxes?status=stored-on-cabinet-slot&code_box=${filter.code}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
