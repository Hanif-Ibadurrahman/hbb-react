import { BorrowItemInterfaceState } from "store/Types/BorrowItemTypes";
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

export const getAll = async (page, area_id: String | null = null) => {
	return api
		.get(`/boxes?status=stored-on-cabinet-slot`, {
			params: {
				page: page,
				area_id: area_id,
			},
		})
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const filterBoxesBorrow = async (data: BorrowItemInterfaceState) => {
	let filter = {
		code_box: data.code_box,
	};

	return api
		.get(`boxes?status=stored-on-cabinet-slot&code_box=${filter.code_box}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
