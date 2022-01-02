import {
	GET_TRANSPORTER_LIST,
	SET_TRANSPORTER_DATA,
} from "../../actions/TransporterAction";
import { TransportersInterfaceState } from "../Types/TransporterTypes";
export const initialState: TransportersInterfaceState = {
	Transporters: [],
	Transporter: {
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
	Title: "Transporter",
	ErrorTransporter: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): TransportersInterfaceState => {
	switch (type) {
		case SET_TRANSPORTER_DATA:
			return {
				...state,
				Transporter: payload,
			};
		case GET_TRANSPORTER_LIST:
			return {
				...state,
				Transporters: payload.data,
				Meta: {
					LastPage: payload?.meta?.last_page,
					CurrentPage: payload?.meta?.current_page,
					Total: payload?.meta?.total_page,
					PerPage: payload?.meta?.total_page,
				},
				ErrorTransporter: payload.errorMessage,
			};
		default:
			return state;
	}
};
