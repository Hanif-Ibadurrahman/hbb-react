import {
	SET_ARCHIVER_DATA,
	GET_ARCHIVER_LIST,
} from "../../actions/ArchiverAction";
import { ArchiversInterfaceState } from "../Types/ArchiverTypes";
export const initialState: ArchiversInterfaceState = {
	Archivers: [],
	Archiver: {
		id: "",
		username: "",
		last_login: "",
		roles: {
			id: "",
			name: "",
			display_name: "",
		},
		staff: {
			id: "",
			nik: "",
			name: "",
			room: "",
		},
	},
	Meta: {
		Total: 0,
		PerPage: 0,
		CurrentPage: 1,
		LastPage: 1,
	},
	Title: "Archiver",
	ErrorArchiver: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): ArchiversInterfaceState => {
	switch (type) {
		case SET_ARCHIVER_DATA:
			return {
				...state,
				Archiver: payload,
			};
		case GET_ARCHIVER_LIST:
			return {
				...state,
				Archivers: payload.data,
				Meta: {
					LastPage: payload?.meta?.last_page,
					CurrentPage: payload?.meta?.current_page,
					Total: payload?.meta?.total_page,
					PerPage: payload?.meta?.total_page,
				},
				ErrorArchiver: payload.errorMessage,
			};
		default:
			return state;
	}
};
