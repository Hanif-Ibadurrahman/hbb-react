import {
	GET_DOCUMENTS_LIST,
	CREATE_DOCUMENT,
	GET_DOCUMENT_DETAIL,
	EDIT_DOCUMENT,
	RESET_DOCUMENT_LIST,
	RESET_DOCUMENT_FORM,
	SET_DOCUMENT_DATA,
	GET_DOCUMENTS_FILTER,
	UPLOAD_FILE,
	DOWNLOAD_FILE,
	GET_DOCUMENTS_LIST_INDEXING,
} from "../../actions/DocumentAction";
import {
	DocumentsInterfaceState,
	DocumentInterfaceState,
} from "../Types/DocumentTypes";
export const initialState: DocumentsInterfaceState = {
	UploadFile: {
		file: "",
	},
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
		division: {
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
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorDocument: payload.errorMessage,
			};
		case GET_DOCUMENTS_LIST_INDEXING:
			return {
				...state,
				Documents: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorDocument: payload.errorMessage,
			};
		case DOWNLOAD_FILE:
			return {
				...state,
				Documents: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorDocument: payload.errorMessage,
			};
		case GET_DOCUMENTS_FILTER:
			return {
				...state,
				Documents: payload?.data?.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
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
		case UPLOAD_FILE:
			return {
				...state,
				UploadFile: payload?.data?.data,
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
					division: {
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
