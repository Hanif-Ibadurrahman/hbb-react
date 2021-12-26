import {
	GET_CABINETS_LIST,
	CREATE_CABINET,
	GET_CABINET_DETAIL,
	UPDATE_CABINET,
	RESET_CABINET_LIST,
	RESET_CABINET_FORM,
	SET_CABINET_DATA,
} from "../../actions/CabinetAction";
import {
	CabinetsInterfaceState,
	CabinetInterfaceState,
} from "../Types/CabinetTypes";
export const initialState: CabinetsInterfaceState = {
	Cabinets: [],
	Cabinet: {
		Id: "",
		CodeCabinet: "",
		CodeBlockNumb: "",
		CodeTotalBays: "",
		CodeTotalRow: "",
		CodeTotalColumns: "",
		CodeDepth: "",
		CodeRoom: "",
		SignCode: "",
		CabinetSlots: [
			{
				Id: "",
				Code: "",
				Capacity: 0,
				Column: 0,
				Row: 0,
				SignCode: "",
			},
		],
	},

	Meta: {
		Total: 0,
		PerPage: 0,
		CurrentPage: 1,
		LastPage: 1,
	},
	Title: "CABINET",
	ErrorCabinet: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): CabinetsInterfaceState => {
	switch (type) {
		case SET_CABINET_DATA:
			return {
				...state,
				Cabinet: payload,
			};
		case GET_CABINETS_LIST:
			return {
				...state,
				Cabinets: payload.data,
				Meta: {
					LastPage: payload?.meta?.last_page,
					CurrentPage: payload?.meta?.current_page,
					Total: payload?.meta?.total_page,
					PerPage: payload?.meta?.total_page,
				},
				ErrorCabinet: payload.errorMessage,
			};
		case GET_CABINET_DETAIL:
			return {
				...state,
				Cabinet: {
					CodeRoom: payload.data.data.room,
					CodeDepth: payload.data.data.depth,
					CodeTotalColumns: payload.data.data.total_columns,
					CodeTotalRow: payload.data.data.total_rows,
					CodeTotalBays: payload.data.data.total_bays,
					CodeBlockNumb: payload.data.data.block_numb,
					CodeCabinet: payload.data.data.code_cabinet,
					Id: payload.data.data.id,
					SignCode: payload.data.data.sign_code,
					CabinetSlots: [
						{
							Id: payload?.data?.data?.cabinetSlots?.id,
							Code: payload?.data?.data?.cabinetSlots?.id,
							Capacity: payload?.data?.data?.cabinetSlots?.capacity,
							Column: payload?.data?.data?.cabinetSlots?.column,
							Row: payload?.data?.data?.cabinetSlots?.row,
							SignCode: payload?.data?.data?.cabinetSlots?.SignCode,
						},
					],
				},
				ErrorCabinet: payload.errorMessage,
			};
		case CREATE_CABINET:
			return {
				...state,
				Cabinet: {
					CodeRoom: payload.data.data.room,
					CodeDepth: payload.data.data.depth,
					CodeTotalColumns: payload.data.data.total_columns,
					CodeTotalRow: payload.data.data.total_rows,
					CodeTotalBays: payload.data.data.total_bays,
					CodeBlockNumb: payload.data.data.block_numb,
					CodeCabinet: payload.data.data.code_cabinet,
					Id: payload.data.data.id,
					SignCode: payload.data.data.code_cabinet,
					CabinetSlots: [
						{
							Id: payload?.data?.data?.cabinetSlots?.id,
							Code: payload?.data?.data?.cabinetSlots?.id,
							Capacity: payload?.data?.data?.cabinetSlots?.capacity,
							Column: payload?.data?.data?.cabinetSlots?.column,
							Row: payload?.data?.data?.cabinetSlots?.row,
							SignCode: payload?.data?.data?.cabinetSlots?.SignCode,
						},
					],
				},
			};
		case UPDATE_CABINET:
			return {
				...state,
				Cabinet: {
					CodeRoom: payload.data.data.room,
					CodeDepth: payload.data.data.depth,
					CodeTotalColumns: payload.data.data.total_columns,
					CodeTotalRow: payload.data.data.total_rows,
					CodeTotalBays: payload.data.data.total_bays,
					CodeBlockNumb: payload.data.data.block_numb,
					Id: payload.data.id,
					CodeCabinet: payload.data.code_cabinet,
					SignCode: payload.data.data.code_cabinet,
					CabinetSlots: [
						{
							Id: payload?.data?.data?.cabinetSlots?.id,
							Code: payload?.data?.data?.cabinetSlots?.id,
							Capacity: payload?.data?.data?.cabinetSlots?.capacity,
							Column: payload?.data?.data?.cabinetSlots?.column,
							Row: payload?.data?.data?.cabinetSlots?.row,
							SignCode: payload?.data?.data?.cabinetSlots?.SignCode,
						},
					],
				},
				ErrorCabinet: payload.errorMessage,
			};
		case RESET_CABINET_LIST:
			return {
				...state,
				Cabinets: [],
			};
		case RESET_CABINET_FORM:
			return {
				...state,
				Cabinet: {
					Id: "",
					CodeCabinet: "",
					CodeBlockNumb: "",
					CodeTotalBays: "",
					CodeTotalRow: "",
					CodeTotalColumns: "",
					CodeDepth: "",
					CodeRoom: "",
					SignCode: "",
					CabinetSlots: [
						{
							Id: "",
							Code: "",
							Capacity: 0,
							Column: 0,
							Row: 0,
							SignCode: "",
						},
					],
				},
			};
		default:
			return state;
	}
};
