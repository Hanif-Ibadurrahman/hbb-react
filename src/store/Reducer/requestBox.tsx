import {
	GET_REQUEST_BOXES_LIST,
	CREATE_REQUEST_BOX,
	GET_REQUEST_BOX_DETAIL,
	UPDATE_REQUEST_BOX,
	RESET_REQUEST_BOX_LIST,
	RESET_REQUEST_BOX_FORM,
	SET_REQUEST_BOX_DATA,
	APPROVAL_ADMIN,
	GET_CONFIRMED_ADMIN,
	REJECT_OPERTAION,
	APPROVAL_OPERATION,
} from "../../actions/RequestBoxAction";

import {
	RequestBoxesInterfaceState,
	RequestBoxInterfaceState,
	ApprovalInterfaceState,
} from "../Types/RequestBoxTypes";

export const initialState: RequestBoxesInterfaceState = {
	RequestBoxes: [],
	ApprovalAdmin: {
		Id: "",
		Approved: false,
		Description: "",
	},
	ApprovalOperation: {
		id: "",
		is_approved: false,
		delivery_date: "",
		archiver_id: "",
		transporter_id: {
			id: "",
			brand: "",
			capacity: "",
			license_plate: "",
		},
	},
	RequestBox: {
		id: "",
		quantity: "",
		note: "",
		status: "",
		delivered_at: "",
		delivery_method: "regular",
		code_boxes: [],
	},

	Meta: {
		Total: 0,
		PerPage: 0,
		CurrentPage: 1,
		LastPage: 1,
	},
	Title: "REQUEST_BOX",
	ErrorRequestBox: undefined,
};

export default (
	state = initialState,
	{ type, payload },
): RequestBoxesInterfaceState => {
	switch (type) {
		case SET_REQUEST_BOX_DATA:
			return {
				...state,
				RequestBox: payload,
			};
		case GET_REQUEST_BOXES_LIST:
			return {
				...state,
				RequestBoxes: payload?.data,
				Meta: {
					LastPage: payload?.met?.last_page,
					CurrentPage: payload?.meta?.current_page,
					Total: payload?.meta?.total,
					PerPage: payload?.meta?.total_page,
				},
				ErrorRequestBox: payload.errorMessage,
			};
		case GET_CONFIRMED_ADMIN:
			return {
				...state,
				RequestBoxes: payload.data,
				Meta: {
					LastPage: payload?.meta?.last_page,
					CurrentPage: payload?.meta?.current_page,
					Total: payload?.meta?.total_page,
					PerPage: payload?.meta?.total_page,
				},
				ErrorRequestBox: payload.errorMessage,
			};
		case GET_REQUEST_BOX_DETAIL:
			return {
				...state,
				RequestBox: payload?.data?.data,
				ErrorRequestBox: payload?.errorMessage,
			};
		case CREATE_REQUEST_BOX:
			return {
				...state,
				RequestBox: payload?.data?.data,
			};
		case UPDATE_REQUEST_BOX:
			return {
				...state,
				RequestBox: payload?.data?.data,
				ErrorRequestBox: payload?.errorMessage,
			};
		case APPROVAL_ADMIN:
			return {
				...state,
				ApprovalAdmin: {
					Id: payload.data?.data?.id,
					Approved: payload?.data?.data?.is_approved,
					Description: payload?.data?.data?.description,
				},
			};
		case APPROVAL_OPERATION:
			return {
				...state,
				ApprovalOperation: payload?.data?.data,
			};
		case REJECT_OPERTAION:
			return {
				...state,
				ApprovalAdmin: {
					Id: payload.data?.data?.id,
					Approved: payload.data?.data?.is_approved,
					Description: payload.data?.data?.description,
				},
			};
		case RESET_REQUEST_BOX_LIST:
			return {
				...state,
				RequestBoxes: [],
			};
		case RESET_REQUEST_BOX_FORM:
			return {
				...state,
				RequestBox: {
					id: "",
					quantity: "",
					note: "",
					status: "",
					delivered_at: "",
					delivery_method: "regular",
					code_boxes: [],
				},
			};

		default:
			return state;
	}
};
