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
		id: "",
		brand: "",
		capacity: "",
		license_plate: "",
	},
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
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
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorCar: payload.errorMessage,
			};
		case GET_CAR_DETAIL:
			return {
				...state,
				Car: payload.data.data,
				ErrorCar: payload.errorMessage,
			};
		case CREATE_CAR:
			return {
				...state,
				Car: payload.data.data,
			};
		case EDIT_CAR:
			return {
				...state,
				Car: payload.data.data,
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
					id: "",
					brand: "",
					capacity: "",
					license_plate: "",
				},
			};
		default:
			return state;
	}
};
