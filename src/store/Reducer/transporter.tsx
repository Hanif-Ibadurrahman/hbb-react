import {
	GET_TRANSPORTER_LIST,
	SET_TRANSPORTER_DATA,
	GET_BOX_NO_ASIGN,
} from "../../actions/TransporterAction";
import { TransportersInterfaceState } from "../Types/TransporterTypes";
export const initialState: TransportersInterfaceState = {
	BoxNoAsign: [],
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
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
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
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorTransporter: payload.errorMessage,
			};
		case GET_BOX_NO_ASIGN:
			return {
				...state,
				BoxNoAsign: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorTransporter: payload.errorMessage,
			};
		default:
			return state;
	}
};
