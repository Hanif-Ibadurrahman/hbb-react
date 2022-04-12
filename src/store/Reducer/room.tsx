import {
	GET_ROOMS_LIST,
	CREATE_ROOM,
	GET_ROOM_DETAIL,
	UPDATE_ROOM,
	RESET_ROOM_LIST,
	RESET_ROOM_FORM,
	SET_ROOM_DATA,
} from "../../actions/RoomAction";
import { RoomsInterfaceState, RoomInterfaceState } from "../Types/RoomTypes";
// import { AreaInterfaceState } from "store/Types/AreaTypes";

export const initialState: RoomsInterfaceState = {
	Rooms: [],
	Room: {
		id: "",
		name: "",
		code_room: "",
		area: {
			id: "",
			name: "",
			code_area: "",
		},
	},
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	Title: "ROOM",
	ErrorRoom: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): RoomsInterfaceState => {
	switch (type) {
		case SET_ROOM_DATA:
			return {
				...state,
				Room: payload,
			};
		case GET_ROOMS_LIST:
			return {
				...state,
				Rooms: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorRoom: payload.errorMessage,
			};
		case GET_ROOM_DETAIL:
			return {
				...state,
				Room: payload?.data?.data,
				ErrorRoom: payload.errorMessage,
			};
		case CREATE_ROOM:
			return {
				...state,
				Room: payload?.data?.data,
			};
		case UPDATE_ROOM:
			return {
				...state,
				Room: payload?.data?.data,
				ErrorRoom: payload.errorMessage,
			};
		case RESET_ROOM_LIST:
			return {
				...state,
				Rooms: [],
			};
		case RESET_ROOM_FORM:
			return {
				...state,
				Room: {
					id: "",
					name: "",
					code_room: "",
					area: {
						id: "",
						name: "",
						code_area: "",
					},
				},
			};
		default:
			return state;
	}
};
