import {
	GET_FOLDERS_LIST,
	GET_FOLDER_DETAIL,
} from "../../actions/FolderAction";

let initialState = {
	folders: [],
	key: "",
	FolderDetail: "",
	meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
	},
	errorFoldersList: "",
	errorFoldersDetail: "",
	title: "FOLDER",
};

const folders = (state = initialState, action) => {
	switch (action.type) {
		case GET_FOLDERS_LIST:
			return {
				...state,
				folders: action.payload.data.data,
				meta: action.payload.data.meta,
				errorFoldersList: action.payload.errorMessage,
			};
		case GET_FOLDER_DETAIL:
			return {
				...state,
				FolderDetail: action.payload.data.data,
				errorFolderDetail: action.payload.errorMessage,
			};
		default:
			return state;
	}
};

export default folders;
