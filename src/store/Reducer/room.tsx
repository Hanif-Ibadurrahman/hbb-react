import { GET_ROOMS_LIST, GET_ROOMS_DETAIL } from "../../actions/RoomAction";

let initialState = {
	rooms: [],
	RoomDetail: "",
	meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
	},
	errorRoomsList: "",
	errorRoomsDetail: "",
	title: "ROOM",
};

const rooms = (state = initialState, action) => {
	switch (action.type) {
		case GET_ROOMS_LIST:
			return {
				...state,
				rooms: action.payload.data.data,
				meta: action.payload.data.meta,
				errorRoomsList: action.payload.errorMessage,
			};
		case GET_ROOMS_DETAIL:
			return {
				...state,
				RoomDetail: action.payload.data.data,
				meta: action.payload.data.meta,
				errorRoomsList: action.payload.errorMessage,
			};
		default:
			return state;
	}
};

export default rooms;
