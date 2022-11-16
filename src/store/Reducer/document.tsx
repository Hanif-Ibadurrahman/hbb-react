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
	GET_DOCUMENT_ASSIGNED,
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
	DocumentAssigned: [],
	Document: {
		id: "",
		no: "",
		date: "",
		detail: "",
		cabinet: {
			id: "",
			code_cabinet: "",
		},
		cabinetSlot: {
			capacity: 0,
			code: "",
			id: "",
			name: "",
		},
		document_file: [""],
		nominal: "",
		active_year_for: "",
		level_progress: "",
		media_storage: "",
		condition: "",
		amount: 0,
		cross_point: "",
		description: "",
		no_digital: "",
		location: "",
		index: {
			classification: "",
			id: "",
			index: "",
		},
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
			service_types: [
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
		case GET_DOCUMENT_ASSIGNED:
			return {
				...state,
				DocumentAssigned: payload.data,
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
					document_file: [""],
					no: "",
					date: "",
					detail: "",
					nominal: "",
					active_year_for: "",
					cabinet: {
						id: "",
						code_cabinet: "",
					},
					cabinetSlot: {
						capacity: 0,
						code: "",
						id: "",
						name: "",
					},
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
						service_types: [
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
