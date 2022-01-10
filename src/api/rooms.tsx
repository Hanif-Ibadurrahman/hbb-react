import { identity } from "lodash";
import { RoomInterfaceState } from "store/Types/RoomTypes";
import api from "./dox";
export const create = async (data: RoomInterfaceState) => {
	let payload = {
		name: data?.name,
		code_room: data?.code_room,
		area_id: data?.area?.id,
	};
	return api.post("/rooms", payload);
};

export const update = async (data: RoomInterfaceState) => {
	let id = data?.id;
	let payload = {
		name: data?.name,
		code_room: data?.code_room,
		area: data?.area?.id,
	};
	console.log(payload);
	return await api.put(`/rooms/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/rooms/${id}`);
};

export const getAll = async params => {
	return api
		.get(`/rooms?page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const destroy = id => {
	return api.delete(`/rooms/${id}`);
};
