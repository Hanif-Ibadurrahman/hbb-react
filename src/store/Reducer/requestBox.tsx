import {
	GET_REQUEST_BOXES_LIST,
	CREATE_REQUEST_BOX,
	GET_REQUEST_BOX_DETAIL,
	EDIT_REQUEST_BOX,
	RESET_REQUEST_BOX_LIST,
	RESET_REQUEST_BOX_FORM,
	SET_REQUEST_BOX_DATA,
} from "../../actions/RequestBoxAction";

import {
	RequestBoxesInterfaceState,
	RequestBoxInterfaceState,
} from "../Types/RequestBoxTypes";

export const initialState: RequestBoxesInterfaceState = {
	RequestBoxes: [],
	RequestBox: {
		Id: "",
		Quantity: "",
		Note: "",
		Status: "CREATED",
		DeliveredAt: "",
		CodeBoxes: [
			{
				Id_Box: "",
			},
		],
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
				RequestBoxes: payload.data,
				Meta: {
					LastPage: payload.meta.last_page,
					CurrentPage: payload.meta.current_page,
					Total: payload.meta.total_page,
					PerPage: payload.meta.total_page,
				},
				ErrorRequestBox: payload.errorMessage,
			};
		case GET_REQUEST_BOX_DETAIL:
			return {
				...state,
				RequestBox: {
					Id: payload.data.data.id,
					Quantity: payload.data.data.quantity,
					Note: payload.data.data.note,
					Status: payload.data.data.status,
					DeliveredAt: payload.data.data.delivered_at,
					CodeBoxes: payload.data.data.code_boxes,
				},
				ErrorRequestBox: payload.errorMessage,
			};
		case CREATE_REQUEST_BOX:
			return {
				...state,
				RequestBox: {
					Id: payload?.data?.data?.id,
					Quantity: payload?.data?.data?.quantity,
					Note: payload?.data?.data?.note,
					Status: payload?.data?.data?.status,
					DeliveredAt: payload?.data?.data?.delivered_at,
					CodeBoxes: [
						{
							Id_Box: payload?.data?.data?.code_boxes,
						},
					],
					// CodeBoxes: payload?.data?.data?.code_boxes,
				},
			};
		case EDIT_REQUEST_BOX:
			return {
				...state,
				RequestBox: {
					Id: payload.data.data.id,
					Quantity: payload.data.data.quantity,
					Note: payload.data.data.note,
					Status: payload.data.data.status,
					DeliveredAt: payload.data.data.delivered_at,
					CodeBoxes: payload?.data?.data?.code_boxes,
				},
				ErrorRequestBox: payload.errorMessage,
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
					Id: "",
					Quantity: "",
					Note: "",
					Status: "CREATED",
					DeliveredAt: "",
					CodeBoxes: [
						{
							Id_Box: "",
						},
					],
				},
			};

		default:
			return state;
	}
};
