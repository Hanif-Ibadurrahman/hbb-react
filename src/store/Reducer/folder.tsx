import {
	GET_FOLDERS_LIST,
	CREATE_FOLDER,
	GET_FOLDER_DETAIL,
	UPDATE_FOLDER,
	RESET_FOLDER_LIST,
	RESET_FOLDER_FORM,
	SET_FOLDER_DATA,
	FILTER_FOLDER,
	GET_FOLDERS_NOT_PAGE,
	GET_FOLDERS_NOT_ASSIGNED,
	GET_FILTER_DOCUMENT,
} from "../../actions/FolderAction";
import { FoldersInterfaceState } from "../Types/FolderTypes";
export const initialState: FoldersInterfaceState = {
	Folders: [],
	FolderAssigned: [],
	Folder: {
		id: "",
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
			id: "",
			code_box: "",
			custom_code_box: "",
			location: "",
			status: "",
		},
		no: "",
		location: "",
		status: "",
		sign_code: "",
		cabinet_slot: "",
		company: {
			id: "",
			location: "",
			name: "",
			phone: "",
		},
		documents: [
			{
				id: "",
				condition: "",
				description: "",
				no: "",
				detail: "",
				media_storage: "",
				status: "",
				sign_code: "",
			},
		],
	},
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	Title: "Folder",
	ErrorFolder: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): FoldersInterfaceState => {
	switch (type) {
		case SET_FOLDER_DATA:
			return {
				...state,
				Folder: payload,
			};
		case GET_FOLDERS_LIST:
			return {
				...state,
				Folders: payload?.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorFolder: payload.errorMessage,
			};
		case GET_FILTER_DOCUMENT:
			return {
				...state,
				Folder: payload?.data?.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
			};
		case GET_FOLDERS_NOT_ASSIGNED:
			return {
				...state,
				FolderAssigned: payload?.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorFolder: payload.errorMessage,
			};
		case GET_FOLDERS_NOT_PAGE:
			return {
				...state,
				Folders: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorFolder: payload.errorMessage,
			};
		case FILTER_FOLDER:
			return {
				...state,
				Folders: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorFolder: payload.errorMessage,
			};
		case GET_FOLDER_DETAIL:
			return {
				...state,
				Folder: payload?.data?.data,
				ErrorFolder: payload.errorMessage,
			};
		case CREATE_FOLDER:
			return {
				...state,
				Folder: payload?.data?.data,
			};
		case UPDATE_FOLDER:
			return {
				...state,
				Folder: payload?.data?.data,
				ErrorFolder: payload.errorMessage,
			};
		case RESET_FOLDER_LIST:
			return {
				...state,
				Folders: [],
			};
		case RESET_FOLDER_FORM:
			return {
				...state,
				Folder: {
					id: "",
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
						id: "",
						code_box: "",
						custom_code_box: "",
						location: "",
						status: "",
					},
					no: "",
					location: "",
					status: "",
					sign_code: "",
					cabinet_slot: "",
					company: {
						id: "",
						location: "",
						name: "",
						phone: "",
					},
					documents: [
						{
							id: "",
							condition: "",
							description: "",
							detail: "",
							media_storage: "",
							status: "",
							sign_code: "",
							no: "",
						},
					],
				},
			};
		default:
			return state;
	}
};
