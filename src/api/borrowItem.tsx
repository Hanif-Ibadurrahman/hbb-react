import { identity } from "lodash";
import { BorrowItemInterfaceState } from "store/Types/BorrowItemTypes";
import api from "./dox";

export const create = async (data: BorrowItemInterfaceState) => {
	let payload = {
		delivered_at: data.delivered_at,
		note: data.note,
		box_codes: data.box_codes,
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
