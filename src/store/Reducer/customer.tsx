import {
	GET_CUSTOMERS_LIST,
	CREATE_CUSTOMER,
	GET_CUSTOMER_DETAIL,
	UPDATE_CUSTOMER,
	RESET_CUSTOMER_LIST,
	RESET_CUSTOMER_FORM,
	SET_CUSTOMER_DATA,
} from "../../actions/CustomerAction";
import {
	CustomersInterfaceState,
	CustomerInterfaceState,
} from "../Types/CustomerTypes";
// import { AreaInterfaceState } from "store/Types/AreaTypes";

export const initialState: CustomersInterfaceState = {
	Customers: [],
	Customer: {
		id: "",
		username: "",
		password: "",
		name: "",
		email: "",
		phone: "",
		location: "",
		company_id: {
			id: "",
			name: "",
			location: "",
			longitude: "",
			latitude: "",
			person_responsible: "",
			npwp: "",
			email: "",
			phone: "",
			address: "",
			amount_access: "",
			service_type: [
				{
					type: "box",
					value: true,
				},
			],
			is_agree: true,
		},
		division_id: {
			id: "",
			name: "",
		},
	},
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	Title: "ROOM",
	ErrorCustomer: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): CustomersInterfaceState => {
	switch (type) {
		case SET_CUSTOMER_DATA:
			return {
				...state,
				Customer: payload,
			};
		case GET_CUSTOMERS_LIST:
			return {
				...state,
				Customers: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total_page,
					per_page: payload?.meta?.total_page,
				},
				ErrorCustomer: payload.errorMessage,
			};
		case GET_CUSTOMER_DETAIL:
			return {
				...state,
				Customer: payload?.data?.data,
				ErrorCustomer: payload.errorMessage,
			};
		case CREATE_CUSTOMER:
			return {
				...state,
				Customer: payload?.data?.data,
			};
		case UPDATE_CUSTOMER:
			return {
				...state,
				Customer: payload?.data?.data,
				ErrorCustomer: payload.errorMessage,
			};
		case RESET_CUSTOMER_LIST:
			return {
				...state,
				Customers: [],
			};
		case RESET_CUSTOMER_FORM:
			return {
				...state,
				Customer: {
					id: "",
					username: "",
					password: "",
					name: "",
					email: "",
					phone: "",
					location: "",
					company_id: {
						id: "",
						name: "",
						location: "",
						longitude: "",
						latitude: "",
						person_responsible: "",
						npwp: "",
						email: "",
						phone: "",
						address: "",
						amount_access: "",
						service_type: [
							{
								type: "box",
								value: true,
							},
						],
						is_agree: true,
					},
					division_id: {
						id: "",
						name: "",
					},
				},
			};
		default:
			return state;
	}
};
