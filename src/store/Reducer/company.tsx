import {
	GET_COMPANYS_LIST,
	CREATE_COMPANY,
	GET_COMPANY_DETAIL,
	UPDATE_COMPANY,
	RESET_COMPANY_LIST,
	RESET_COMPANY_FORM,
	SET_COMPANY_DATA,
} from "../../actions/CompanyAction";
import {
	CompanysInterfaceState,
	CompanyInterfaceState,
} from "../Types/CompanyTypes";
export const initialState: CompanysInterfaceState = {
	Companys: [],
	Company: {
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
		service_type: [
			{
				type: "box",
				value: true,
			},
		],
		is_agree: true,
	},
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	Title: "COMPANY",
	ErrorCompany: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): CompanysInterfaceState => {
	switch (type) {
		case SET_COMPANY_DATA:
			return {
				...state,
				Company: payload,
			};
		case GET_COMPANYS_LIST:
			return {
				...state,
				Companys: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total_page,
					per_page: payload?.meta?.total_page,
				},
				ErrorCompany: payload.errorMessage,
			};
		case GET_COMPANY_DETAIL:
			return {
				...state,
				Company: payload?.data?.data,
				ErrorCompany: payload.errorMessage,
			};
		case CREATE_COMPANY:
			return {
				...state,
				Company: payload?.data?.data,
			};
		case UPDATE_COMPANY:
			return {
				...state,
				Company: payload?.data?.data,
				ErrorCompany: payload.errorMessage,
			};
		case RESET_COMPANY_LIST:
			return {
				...state,
				Companys: [],
			};
		case RESET_COMPANY_FORM:
			return {
				...state,
				Company: {
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
					service_type: [
						{
							type: "box",
							value: true,
						},
					],
					is_agree: true,
				},
			};
		default:
			return state;
	}
};
