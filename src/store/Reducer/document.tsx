import {
	GET_DOCUMENTS_LIST,
	CREATE_DOCUMENT,
	GET_DOCUMENT_DETAIL,
	EDIT_DOCUMENT,
	RESET_DOCUMENT_LIST,
	RESET_DOCUMENT_FORM,
	SET_DOCUMENT_DATA,
	GET_DOCUMENTS_FILTER,
} from "../../actions/DocumentAction";
import {
	DocumentsInterfaceState,
	DocumentInterfaceState,
} from "../Types/DocumentTypes";
export const initialState: DocumentsInterfaceState = {
	Documents: [],
	Document: {
		id: "",
		no: "",
		date: "",
		detail: "",
		nominal: 0,
		active_year_for: 0,
		level_progress: "",
		media_storage: "",
		condition: "",
		amount: 0,
		cross_point: "",
		description: "",
		no_digital: "",
		location: "",
		status: "",
		sign_code: "",
		box: {
			code_box: "",
			id: "",
		},
		folder: {
			id: "",
			location: "",
			no: "",
			sign_code: "",
		},
	},
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	Title: "Document",
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
		case GET_DOCUMENTS_FILTER:
			return {
				...state,
				Document: payload?.data?.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total_page,
					per_page: payload?.meta?.total_page,
				},
				ErrorDocument: payload?.errorMessage,
			};
		case GET_DOCUMENT_DETAIL:
			return {
				...state,
				Document: payload?.data?.data,
				ErrorDocument: payload.errorMessage,
			};
		case CREATE_DOCUMENT:
			return {
				...state,
				Document: payload?.data?.data,
			};
		case EDIT_DOCUMENT:
			return {
				...state,
				Document: payload?.data?.data,
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
					id: "",
					no: "",
					date: "",
					detail: "",
					nominal: 0,
					active_year_for: 0,
					level_progress: "",
					media_storage: "",
					condition: "",
					amount: 0,
					cross_point: "",
					description: "",
					no_digital: "",
					location: "",
					status: "",
					sign_code: "",
					box: {
						code_box: "",
						id: "",
					},
					folder: {
						id: "",
						location: "",
						no: "",
						sign_code: "",
					},
				},
			};
		default:
			return state;
	}
};
