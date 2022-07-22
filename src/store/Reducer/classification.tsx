import {
	GET_CLASSIFICATIONS_LIST,
	CREATE_CLASSIFICATION,
	GET_CLASSIFICATION_DETAIL,
	UPDATE_CLASSIFICATION,
	RESET_CLASSIFICATION_LIST,
	RESET_CLASSIFICATION_FORM,
	SET_CLASSIFICATION_DATA,
	FILTER_CLASSIFICATION,
} from "../../actions/ClassificationAction";
import {
	ClassificationsInterfaceState,
	ClassificationInterfaceState,
} from "store/Types/ClassificationTypes";

export const initialState: ClassificationsInterfaceState = {
	Classifications: [],
	Classification: {
		id: "",
		name: "",
		type: "",
		code: "",
		retention_period: "",
		code_classification: "",
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
			service_type: [
				{
					type: "box",
					value: true,
				},
			],
			is_agree: true,
		},
	},
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	Title: "CLASSIFICATION",
	ErrorClassification: undefined,
};

export default (
	state = initialState,
	{ type, payload },
): ClassificationsInterfaceState => {
	switch (type) {
		case SET_CLASSIFICATION_DATA:
			return {
				...state,
				Classification: payload,
			};
		case GET_CLASSIFICATIONS_LIST:
			return {
				...state,
				Classifications: payload?.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
			};
		case FILTER_CLASSIFICATION:
			return {
				...state,
				Classifications: payload?.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorClassification: payload.errorMessage,
			};
		case GET_CLASSIFICATION_DETAIL:
			return {
				...state,
				Classification: payload?.data?.data,
				ErrorClassification: payload.errorMessage,
			};
		case CREATE_CLASSIFICATION:
			return {
				...state,
				Classification: payload?.data?.data,
			};
		case UPDATE_CLASSIFICATION:
			return {
				...state,
				Classification: payload?.data?.data,
				ErrorClassification: payload.errorMessage,
			};
		case RESET_CLASSIFICATION_LIST:
			return {
				...state,
				Classifications: [],
			};
		case RESET_CLASSIFICATION_FORM:
			return {
				...state,
				Classification: {
					id: "",
					name: "",
					type: "",
					code: "",
					retention_period: "",
					code_classification: "",
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
						service_type: [
							{
								type: "box",
								value: true,
							},
						],
						is_agree: true,
					},
				},
			};
		default:
			return state;
	}
};
