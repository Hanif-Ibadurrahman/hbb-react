import { CabinetInterfaceState } from "store/Types/CabinetTypes";
import api from "./dox";
export const create = async (data: CabinetInterfaceState) => {
	let payload = {
		code_cabinet: data?.code_cabinet,
		block_number: data?.block_number,
		total_bays: data?.total_bays,
		total_rows: data?.total_rows,
		total_columns: data?.total_columns,
		room_id: data?.room?.id,
		depth: data?.depth,
	};
	return api.post("/cabinets", payload);
};

export const update = async (data: CabinetInterfaceState) => {
	let id = data?.id;
	let payload = {
		code_cabinet: data?.code_cabinet,
		block_number: data?.block_number,
		total_bays: data?.total_bays,
		total_rows: data?.total_rows,
		total_columns: data?.total_columns,
		room_id: data?.room?.id,
		depth: data?.depth,
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

export const filterCabinet = async (data: CabinetInterfaceState) => {
	let filter = {
		code: data.code_cabinet,
	};

	return api
		.get(`/cabinets?code_cabinet=${filter.code}`)
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
