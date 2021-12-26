import {
	GET_FOLDERS_LIST,
	CREATE_FOLDER,
	GET_FOLDER_DETAIL,
	UPDATE_FOLDER,
	RESET_FOLDER_LIST,
	RESET_FOLDER_FORM,
	SET_FOLDER_DATA,
} from "../../actions/FolderAction";
import {
	FoldersInterfaceState,
	FolderInterfaceState,
} from "../Types/FolderTypes";
export const initialState: FoldersInterfaceState = {
	Folders: [],
	Folder: {
		Id: "",
		No: "",
		Location: "",
		Status: "",
		SignCode: "",
	},
	Meta: {
		Total: 0,
		PerPage: 0,
		CurrentPage: 1,
		LastPage: 1,
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
				Folders: payload.data,
				Meta: {
					LastPage: payload.meta.last_page,
					CurrentPage: payload.meta.current_page,
					Total: payload.meta.total_page,
					PerPage: payload.meta.total_page,
				},
				ErrorFolder: payload.errorMessage,
			};
		case GET_FOLDER_DETAIL:
			return {
				...state,
				Folder: {
					Id: payload?.data?.data?.id,
					No: payload?.data?.data?.no,
					Location: payload?.data?.data?.location,
					Status: payload?.data?.data?.status,
					SignCode: payload?.data?.data?.sign_code,
				},
				ErrorFolder: payload.errorMessage,
			};
		case CREATE_FOLDER:
			return {
				...state,
				Folder: {
					Id: payload?.data?.data?.id,
					No: payload?.data?.data?.no,
					Location: payload?.data?.data?.location,
					Status: payload?.data?.data?.status,
					SignCode: payload?.data?.data?.sign_code,
				},
			};
		case UPDATE_FOLDER:
			return {
				...state,
				Folder: {
					Id: payload?.data?.data?.id,
					No: payload?.data?.data?.no,
					Location: payload?.data?.data?.location,
					Status: payload?.data?.data?.status,
					SignCode: payload?.data?.data?.sign_code,
				},
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
					Id: "",
					No: "",
					Location: "",
					Status: "",
					SignCode: "",
				},
			};
		default:
			return state;
	}
};
