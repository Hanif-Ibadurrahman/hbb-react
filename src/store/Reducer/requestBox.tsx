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
	GET_ALL_REQUEST,
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
		archiver_id: {
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
		transporter_id: {
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
	},
	RequestBox: {
		id: "",
		quantity: "",
		note: "",
		status: "",
		delivered_at: "",
		delivery_method: "regular",
		code_boxes: [],
		request_logs: [
			{
				time: "",
				status: "",
			},
		],
		customer: {
			id: "",
			username: "",
			password: "",
			name: "",
			email: "",
			phone: "",
			location: "",
			company: {
				id: "",
				name: "",
				location: "",
				longitude: "",
				latitude: "",
				person_responsible: "",
				npwp: "",
				email: "",
				phone: "",
				address: "",
				amount_access: "",
				service_type: [
					{
						type: "box",
						value: true,
					},
				],
				is_agree: true,
			},
			division_id: {
				id: "",
				name: "",
			},
		},
	},

	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
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
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total_page,
					per_page: payload?.meta?.total_page,
				},
				ErrorRequestBox: payload.errorMessage,
			};
		case GET_CONFIRMED_ADMIN:
			return {
				...state,
				RequestBoxes: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total_page,
					per_page: payload?.meta?.total_page,
				},
				ErrorRequestBox: payload.errorMessage,
			};
		case GET_ALL_REQUEST:
			return {
				...state,
				RequestBoxes: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total_page,
					per_page: payload?.meta?.total_page,
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
					request_logs: [
						{
							time: "",
							status: "",
						},
					],
					customer: {
						id: "",
						username: "",
						password: "",
						name: "",
						email: "",
						phone: "",
						location: "",
						company: {
							id: "",
							name: "",
							location: "",
							longitude: "",
							latitude: "",
							person_responsible: "",
							npwp: "",
							email: "",
							phone: "",
							address: "",
							amount_access: "",
							service_type: [
								{
									type: "box",
									value: true,
								},
							],
							is_agree: true,
						},
						division_id: {
							id: "",
							name: "",
						},
					},
				},
			};

		default:
			return state;
	}
};
