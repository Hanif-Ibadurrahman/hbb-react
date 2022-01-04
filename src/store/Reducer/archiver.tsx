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
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
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
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total_page,
					per_page: payload?.meta?.total_page,
				},
				ErrorArchiver: payload.errorMessage,
			};
		default:
			return state;
	}
};
