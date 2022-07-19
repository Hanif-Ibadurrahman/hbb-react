import {
	CREATE_INDEX,
	GET_INDEXING_LIST,
	FILTER_INDEXING,
	GET_INDEX_DETAIL,
	RESET_INDEX_FORM,
	RESET_INDEX_LIST,
	SET_INDEX_DATA,
	UPDATE_INDEX,
	ADD_CART,
	DELETE_CART,
	GET_NUMBER_CART,
	ADD_CART_ASSIGN,
	DELETE_CART_ASSIGN,
	GET_NUMBER_CART_ASSIGN,
	PUT_ASSIGN_DOCUMENT_TO_FOLDER,
	PUT_DETTACH_DOCUMENT_FROM_FOLDER,
	PUT_INDEXING_DOCUMENT,
	GET_INDEXING_RETENTION,
	PUT_ASSIGN_FOLDER_TO_BOX,
	PUT_DETTACH_FOLDER_FROM_BOX,
} from "../../actions/IndexingAction";
import { IndexingsInterfaceState } from "../Types/IndexingTypes";
export const initialState: IndexingsInterfaceState = {
	Indexings: [],
	Indexing: {
		id: "",
		classification: {
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
		area: {
			code_area: "",
			id: "",
			name: "",
		},
		room: {
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
	},
	IndexingDocument: {
		id: "",
		document_codes: [],
	},
	AssignDocumentToFolder: {
		id: "",
		document_codes: [],
		id_folder: {
			id: "",
			division: {
				id: "",
				name: "",
				customers: [
					{
						id: "",
						name: "",
						phone: "",
						email: "",
						location: "",
						company: {
							id: "",
							name: "",
							code: 0,
							location: "",
						},
					},
				],
			},
			box: {
				id: "",
				code_box: "",
				custom_code_box: "",
				location: "",
				status: "",
			},
			no: "",
			location: "",
			status: "",
			sign_code: "",
			cabinet_slot: "",
			company: {
				id: "",
				location: "",
				name: "",
				phone: "",
			},
			documents: [
				{
					id: "",
					condition: "",
					description: "",
					detail: "",
					media_storage: "",
					status: "",
					sign_code: "",
				},
			],
		},
	},
	AssignFolderToBox: {
		id: "",
		folder_codes: [],
		id_box: {
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
	Cart: [],
	numberCart: 0,
	CartAssign: [],
	NumberCartAssign: 0,
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
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
		case GET_NUMBER_CART:
			return {
				...state,
			};
		case ADD_CART_ASSIGN:
			const checkCartExistAssign = () => {
				if (state?.CartAssign.indexOf(payload, 0) < 0) return true;
				return false;
			};
			return {
				...state,
				CartAssign: checkCartExistAssign()
					? [...state.CartAssign, payload]
					: [...state.CartAssign],
				NumberCartAssign: checkCartExistAssign()
					? state.NumberCartAssign + 1
					: state.NumberCartAssign,
			};
		case DELETE_CART_ASSIGN:
			return {
				...state,
				NumberCartAssign: state.NumberCartAssign - 1,
				CartAssign: state.CartAssign.filter(Cart => Cart !== payload),
			};
		case GET_NUMBER_CART_ASSIGN:
			return {
				...state,
			};
		case PUT_INDEXING_DOCUMENT:
			return {
				...state,
				IndexingDocument: payload?.data?.data,
			};
		case PUT_ASSIGN_DOCUMENT_TO_FOLDER:
			return {
				...state,
				AssignDocumentToFolder: payload?.data?.data,
			};
		case PUT_DETTACH_DOCUMENT_FROM_FOLDER:
			return {
				...state,
				AssignDocumentToFolder: payload?.data?.data,
			};
		case PUT_ASSIGN_FOLDER_TO_BOX:
			return {
				...state,
				AssignFolderToBox: payload?.data?.data,
			};
		case PUT_DETTACH_FOLDER_FROM_BOX:
			return {
				...state,
				AssignFolderToBox: payload?.data?.data,
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
					classification: {
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
					area: {
						code_area: "",
						id: "",
						name: "",
					},
					room: {
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
				},
			};
		case GET_INDEXING_RETENTION:
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
		default:
			return state;
	}
};
