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
	GET_ALL_APPROVED,
	SEARCH_APPROVAL_ADMIN,
	SEARCH_APPROVAL_OPERATION,
	SEARCH_ALL_APPROVAL,
} from "../../actions/RequestBoxAction";

import { RequestBoxesInterfaceState } from "../Types/RequestBoxTypes";

export const initialState: RequestBoxesInterfaceState = {
	RequestBoxes: [],
	ApprovalRequest: [],
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
		type: "",
		request_logs: [
			{
				time: "",
				status: "",
			},
		],
		request_items: [
			{
				box: {
					id: "",
					code_box: "",
					sign_code: "",
					status: "",
					location: "",
					created_at: "",
					custom_code_box: "",
					division: {
						id: "",
						code: "",
						name: "",
					},
					folders: [
						{
							id: "",
							no: "",
							sign_code: "",
							status: "",
							location: "",
						},
					],
					cabinet_slot: {
						id: "",
						capacity: 0,
						code: "",
						column: "",
						name: "",
						row: 0,
						sign_code: "",
					},
					company: {
						id: "",
						code: "",
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
				},
				status: "",
			},
		],
		created_at: "",
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
				code: "",
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
	CSROperationNotif: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	CSRAdminNotif: {
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
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				CSRAdminNotif: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorRequestBox: payload.errorMessage,
			};
		case SEARCH_APPROVAL_ADMIN:
			return {
				...state,
				RequestBoxes: payload?.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				CSRAdminNotif: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorRequestBox: payload.errorMessage,
			};
		case SEARCH_APPROVAL_OPERATION:
			return {
				...state,
				RequestBoxes: payload?.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				CSRAdminNotif: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
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
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				CSROperationNotif: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
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
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorRequestBox: payload.errorMessage,
			};
		case GET_REQUEST_BOX_DETAIL:
			return {
				...state,
				RequestBox: payload?.data?.data,
				ErrorRequestBox: payload?.errorMessage,
			};
		case GET_ALL_APPROVED:
			return {
				...state,
				ApprovalRequest: payload?.data,
				ErrorRequestBox: payload?.errorMessage,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
			};
		case SEARCH_ALL_APPROVAL:
			return {
				...state,
				ApprovalRequest: payload?.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorRequestBox: payload.errorMessage,
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
					type: "",
					code_boxes: [],
					created_at: "",
					request_items: [
						{
							box: {
								id: "",
								code_box: "",
								sign_code: "",
								status: "",
								location: "",
								created_at: "",
								custom_code_box: "",
								division: {
									id: "",
									code: "",
									name: "",
								},
								folders: [
									{
										id: "",
										no: "",
										sign_code: "",
										status: "",
										location: "",
									},
								],
								cabinet_slot: {
									id: "",
									capacity: 0,
									code: "",
									column: "",
									name: "",
									row: 0,
									sign_code: "",
								},
								company: {
									id: "",
									code: "",
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
							},
							status: "",
						},
					],
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
							code: "",
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
