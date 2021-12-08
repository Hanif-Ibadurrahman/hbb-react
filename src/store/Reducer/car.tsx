import {
	GET_CARS_LIST,
	CREATE_CAR,
	GET_CAR_DETAIL,
	EDIT_CAR,
	RESET_CAR_LIST,
	RESET_CAR_FORM,
	SET_CAR_DATA,
} from "../../actions/CarAction";
import { CarsInterfaceState, CarInterfaceState } from "../Types/CarTypes";
export const initialState: CarsInterfaceState = {
	Cars: [],
	Car: {
		Id: "",
		Brand: "",
		Capacity: "",
		LicensePlate: "",
	},
	Meta: {
		Total: 0,
		PerPage: 0,
		CurrentPage: 1,
		LastPage: 1,
	},
	Title: "CAR",
	ErrorCar: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): CarsInterfaceState => {
	switch (type) {
		case SET_CAR_DATA:
			return {
				...state,
				Car: payload,
			};
		case GET_CARS_LIST:
			return {
				...state,
				Cars: payload.data,
				Meta: {
					LastPage: payload?.meta?.last_page,
					CurrentPage: payload?.meta?.current_page,
					Total: payload?.meta?.total_page,
					PerPage: payload?.meta?.total_page,
				},
				ErrorCar: payload.errorMessage,
			};
		case GET_CAR_DETAIL:
			return {
				...state,
				Car: {
					Id: payload.data.data.id,
					Brand: payload.data.data.brand,
					Capacity: payload.data.data.capacity,
					LicensePlate: payload.data.data.license_plate,
				},
				ErrorCar: payload.errorMessage,
			};
		case CREATE_CAR:
			return {
				...state,
				Car: {
					Id: payload.data.data.id,
					Brand: payload.data.data.brand,
					Capacity: payload.data.data.capacity,
					LicensePlate: payload.data.data.license_plate,
				},
			};
		case EDIT_CAR:
			return {
				...state,
				Car: {
					Id: payload.data.data.id,
					Brand: payload.data.data.brand,
					Capacity: payload.data.data.capacity,
					LicensePlate: payload.data.data.license_plate,
				},
				ErrorCar: payload.errorMessage,
			};
		case RESET_CAR_LIST:
			return {
				...state,
				Cars: [],
			};
		case RESET_CAR_FORM:
			return {
				...state,
				Car: {
					Id: "",
					Brand: "",
					Capacity: "",
					LicensePlate: "",
				},
			};
		default:
			return state;
	}
};
