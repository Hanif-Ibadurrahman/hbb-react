import { identity } from "lodash";
import { CabinetInterfaceState } from "store/Types/CabinetTypes";
import api from "./dox";
export const create = async (data: CabinetInterfaceState) => {
	let payload = {
		// code_cabinet: data.CodeCabinet,
		// block_numb: data.CodeBlockNumb,
		// total_bays: data.CodeTotalBays,
		// total_rows: data.CodeTotalRow,
		// total_columns: data.CodeTotalColumns,
		// depth: data.CodeDepth,
		// room_id: data.CodeRoom,
	};
	return api.post("/cabinets", payload);
};

export const update = async (data: CabinetInterfaceState) => {
	let id = data.id;
	let payload = {
		// code_cabinet: data.CodeCabinet,
		// block_numb: data.CodeBlockNumb,
		// total_bays: data.CodeTotalBays,
		// total_rows: data.CodeTotalRow,
		// total_columns: data.CodeTotalColumns,
		// depth: data.CodeDepth,
		// room_id: data.CodeRoom,
	};
	console.log(payload);
	return await api.put(`/cabinets/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/cabinets/${id}`);
};

export const getAll = async params => {
	return api
		.get(`/cabinets?page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const destroy = id => {
	return api.delete(`/cabinets/${id}`);
};
