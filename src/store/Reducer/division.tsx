import {
	GET_DIVISIONS_LIST,
	CREATE_DIVISION,
	GET_DIVISION_DETAIL,
	UPDATE_DIVISION,
	RESET_DIVISION_LIST,
	RESET_DIVISION_FORM,
	SET_DIVISION_DATA,
} from "../../actions/DivisionAction";
import {
	DivisionsInterfaceState,
	DivisionInterfaceState,
} from "../Types/DivisionTypes";
export const initialState: DivisionsInterfaceState = {
	Divisions: [],
	Division: {
		id: "",
		name: "",
		company: {
			id: "",
			code: "",
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
			service_types: [
				{
					type: "box",
					value: false,
				},
			],
			is_agree: true,
		},
		customers: [
			{
				id: "",
				name: "",
				phone: "",
				email: "",
				location: "",
				company: {
					id: "",
					name: "",
					code: 0,
					location: "",
				},
			},
		],
	},
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	Title: "DIVISION",
	ErrorDivision: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): DivisionsInterfaceState => {
	switch (type) {
		case SET_DIVISION_DATA:
			return {
				...state,
				Division: payload,
			};
		case GET_DIVISIONS_LIST:
			return {
				...state,
				Divisions: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorDivision: payload.errorMessage,
			};
		case GET_DIVISION_DETAIL:
			return {
				...state,
				Division: payload?.data?.data,
				ErrorDivision: payload.errorMessage,
			};
		case CREATE_DIVISION:
			return {
				...state,
				Division: payload?.data?.data,
			};
		case UPDATE_DIVISION:
			return {
				...state,
				Division: payload?.data?.data,
				ErrorDivision: payload.errorMessage,
			};
		case RESET_DIVISION_LIST:
			return {
				...state,
				Divisions: [],
			};
		case RESET_DIVISION_FORM:
			return {
				...state,
				Division: {
					id: "",
					name: "",
					customers: [
						{
							id: "",
							name: "",
							phone: "",
							email: "",
							location: "",
							company: {
								id: "",
								name: "",
								code: 0,
								location: "",
							},
						},
					],
				},
			};
		default:
			return state;
	}
};
