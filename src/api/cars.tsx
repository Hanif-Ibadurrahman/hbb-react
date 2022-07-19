import { CarInterfaceState } from "store/Types/CarTypes";
import api from "./dox";
export const create = async (data: CarInterfaceState) => {
	let payload = {
		brand: data.brand,
		capacity: data.capacity,
		license_plate: data.license_plate,
	};
	return api.post("/cars", payload);
};

export const update = async (data: CarInterfaceState) => {
	let id = data.id;
	let payload = {
		brand: data.brand,
		capacity: data.capacity,
		license_plate: data.license_plate,
	};
	console.log(payload);
	return await api.put(`/cars/${id}`, payload);
};

export const getById = async (id: String) => {
	return api.get(`/cars/${id}`);
};

export const getAll = async params => {
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

export const filterCar = async (data: CarInterfaceState) => {
	let filter = {
		license_plate: data.license_plate,
	};

	return api
		.get(`/cars?license_plate=${filter.license_plate}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
