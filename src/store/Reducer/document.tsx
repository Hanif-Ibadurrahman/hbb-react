import {
	GET_DOCUMENTS_LIST,
	CREATE_DOCUMENT,
	GET_DOCUMENT_DETAIL,
	EDIT_DOCUMENT,
	RESET_DOCUMENT_LIST,
	RESET_DOCUMENT_FORM,
	SET_DOCUMENT_DATA,
} from "../../actions/DocumentAction";
import {
	DocumentsInterfaceState,
	DocumentInterfaceState,
} from "../Types/DocumentTypes";
export const initialState: DocumentsInterfaceState = {
	Documents: [],
	Document: {
		Id: "",
		No: "",
		Date: "",
		Detail: "",
		Nominal: 0,
		ActiveYear: 2021,
		LevelProgress: "",
		MediaStorage: "",
		Condition: "",
		Amount: 0,
		CrossPoint: "",
		Description: "",
		NoDigital: "",
		Location: "",
		Status: "",
		SignCode: "",
	},
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	Title: "BOX",
	ErrorDocument: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): DocumentsInterfaceState => {
	switch (type) {
		case SET_DOCUMENT_DATA:
			return {
				...state,
				Document: payload,
			};
		case GET_DOCUMENTS_LIST:
			return {
				...state,
				Documents: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total_page,
					per_page: payload?.meta?.total_page,
				},
				ErrorDocument: payload.errorMessage,
			};
		case GET_DOCUMENT_DETAIL:
			return {
				...state,
				Document: {
					Id: payload?.data?.data?.id,
					No: payload?.data?.data?.no,
					Date: payload?.data?.data?.date,
					Detail: payload?.data?.data?.detail,
					Nominal: payload?.data?.data?.nominal,
					ActiveYear: payload?.data?.data?.active_year_for,
					LevelProgress: payload?.data?.data?.level_progress,
					MediaStorage: payload?.data?.data?.media_storage,
					Condition: payload?.data?.data?.condition,
					Amount: payload?.data?.data?.amount,
					CrossPoint: payload?.data?.data?.cross_point,
					Description: payload?.data?.data?.description,
					NoDigital: payload?.data?.data?.no_digital,
					Location: payload?.data?.data?.location,
					Status: payload?.data?.data?.status,
					SignCode: payload?.data?.data?.sign_code,
				},
				ErrorDocument: payload.errorMessage,
			};
		case CREATE_DOCUMENT:
			return {
				...state,
				Document: {
					Id: payload?.data?.data?.id,
					No: payload?.data?.data?.no,
					Date: payload?.data?.data?.date,
					Detail: payload?.data?.data?.detail,
					Nominal: payload?.data?.data?.nominal,
					ActiveYear: payload?.data?.data?.active_year_for,
					LevelProgress: payload?.data?.data?.level_progress,
					MediaStorage: payload?.data?.data?.media_storage,
					Condition: payload?.data?.data?.condition,
					Amount: payload?.data?.data?.amount,
					CrossPoint: payload?.data?.data?.cross_point,
					Description: payload?.data?.data?.description,
					NoDigital: payload?.data?.data?.no_digital,
					Location: payload?.data?.data?.location,
					Status: payload?.data?.data?.status,
					SignCode: payload?.data?.data?.status,
				},
			};
		case EDIT_DOCUMENT:
			return {
				...state,
				Document: {
					Id: payload?.data?.data?.id,
					No: payload?.data?.data?.no,
					Date: payload?.data?.data?.date,
					Detail: payload?.data?.data?.detail,
					Nominal: payload?.data?.data?.nominal,
					ActiveYear: payload?.data?.data?.active_year_for,
					LevelProgress: payload?.data?.data?.level_progress,
					MediaStorage: payload?.data?.data?.media_storage,
					Condition: payload?.data?.data?.condition,
					Amount: payload?.data?.data?.amount,
					CrossPoint: payload?.data?.data?.cross_point,
					Description: payload?.data?.data?.description,
					NoDigital: payload?.data?.data?.no_digital,
					Location: payload?.data?.data?.location,
					Status: payload?.data?.data?.status,
					SignCode: payload?.data?.data?.status,
				},
				ErrorDocument: payload?.errorMessage,
			};
		case RESET_DOCUMENT_LIST:
			return {
				...state,
				Documents: [],
			};
		case RESET_DOCUMENT_FORM:
			return {
				...state,
				Document: {
					Id: "",
					No: "",
					Date: "",
					Detail: "",
					Nominal: 0,
					ActiveYear: 0,
					LevelProgress: "",
					MediaStorage: "",
					Condition: "",
					Amount: 0,
					CrossPoint: "",
					Description: "",
					NoDigital: "",
					Location: "",
					Status: "",
					SignCode: "",
				},
			};
		default:
			return state;
	}
};
