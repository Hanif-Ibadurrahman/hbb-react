import { CarInterfaceState } from "store/Types/CarTypes";
import api from "./dox";
export const create = async (data: CarInterfaceState) => {
	let payload = {
		brand: data.Brand,
		capacity: data.Capacity,
		license_plate: data.LicensePlate,
	};
	return api.post("/cars", payload);
};

export const update = async (data: CarInterfaceState) => {
	let id = data.Id;
	let payload = {
		brand: data.Brand,
		capacity: data.Capacity,
		license_plate: data.LicensePlate,
	};
	console.log(payload);
	return await api.put(`/cars/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/cars/${id}`);
};

export const getAll = async params => {
	console.log("page3", params);

	return api
		.get(`/cars?page=${params}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const destroy = id => {
	return api.delete(`/cars/${id}`);
};
