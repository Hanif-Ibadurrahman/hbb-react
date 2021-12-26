import { identity } from "lodash";
import { BorrowItemInterfaceState } from "store/Types/BorrowItemTypes";
import api from "./dox";

export const create = async (data: BorrowItemInterfaceState) => {
	let payload = {
		note: data.note,
		box_codes: data.box_codes,
	};
	return api.post("/borrow", payload);
};
