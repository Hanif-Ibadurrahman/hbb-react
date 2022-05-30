import {
	CREATE_INDEX,
	GET_INDEXING_LIST,
	FILTER_INDEXING,
	GET_INDEX_DETAIL,
	INDEXING_ERROR,
	RESET_INDEX_FORM,
	RESET_INDEX_LIST,
	SET_INDEX_DATA,
	UPDATE_INDEX,
	ADD_CART,
	DELETE_CART,
	GET_NUMBER_CART,
} from "../../actions/IndexingAction";
import { IndexingsInterfaceState } from "../Types/IndexingTypes";
export const initialState: IndexingsInterfaceState = {
	Indexings: [],
	Indexing: {
		id: "",
		classification_code: {
			id: "",
			name: "",
			type: "",
			code: "",
			retention_period: "",
		},

		date: "",
		date_retention: "",
		index: "",
		is_permanent: false,
		retention_period: "",
		type: "",
		documents: [
			{
				id: "",
				detail: "",
				no: "",
				serial_number: "",
			},
		],
		area_id: {
			code_area: "",
			id: "",
			name: "",
		},
		room_id: {
			id: "",
			name: "",
			code_room: "",
			floor: 0,
			area: {
				id: "",
				name: "",
				code_area: "",
			},
		},
		box_id: {
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
	},
	IndexingDocument: {
		id: "",
		document_codes: [],
	},
	Cart: [],
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	numberCart: 0,
	Title: "INDEXINGS",
	ErrorIndexing: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): IndexingsInterfaceState => {
	switch (type) {
		case SET_INDEX_DATA:
			return {
				...state,
				Indexing: payload,
			};
		case GET_INDEXING_LIST:
			return {
				...state,
				Indexings: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorIndexing: payload.errorMessage,
			};
		case FILTER_INDEXING:
			return {
				...state,
				Indexings: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorIndexing: payload.errorMessage,
			};
		case GET_INDEX_DETAIL:
			return {
				...state,
				Indexing: payload?.data?.data,
				ErrorIndexing: payload.errorMessage,
			};
		case CREATE_INDEX:
			return {
				...state,
				Indexing: payload?.data?.data,
			};
		case ADD_CART:
			const checkCartExist = () => {
				if (state?.Cart.indexOf(payload, 0) < 0) return true;
				return false;
			};
			return {
				...state,
				Cart: checkCartExist() ? [...state.Cart, payload] : [...state.Cart],
				numberCart: checkCartExist() ? state.numberCart + 1 : state.numberCart,
			};
		case DELETE_CART:
			return {
				...state,
				numberCart: state.numberCart - 1,
				Cart: state.Cart.filter(Cart => Cart !== payload),
			};
		case UPDATE_INDEX:
			return {
				...state,
				Indexing: payload?.data?.data,
				ErrorIndexing: payload.errorMessage,
			};
		case RESET_INDEX_LIST:
			return {
				...state,
				Indexings: [],
			};
		case RESET_INDEX_FORM:
			return {
				...state,
				Indexing: {
					id: "",
					classification_code: {
						id: "",
						name: "",
						type: "",
						code: "",
						retention_period: "",
					},
					date: "",
					date_retention: "",
					index: "",
					is_permanent: false,
					retention_period: "",
					type: "",
					documents: [
						{
							id: "",
							detail: "",
							no: "",
							serial_number: "",
						},
					],
					area_id: {
						code_area: "",
						id: "",
						name: "",
					},
					room_id: {
						id: "",
						name: "",
						code_room: "",
						floor: 0,
						area: {
							id: "",
							name: "",
							code_area: "",
						},
					},
					box_id: {
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
				},
			};
		default:
			return state;
	}
};
