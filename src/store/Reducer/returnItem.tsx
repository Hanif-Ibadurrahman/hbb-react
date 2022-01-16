import {
	CREATE_RETURN_ITEM,
	RESET_RETURN_LIST,
	RESET_RETURN_FORM,
	SET_RETURN_DATA,
	GET_NUMBER_CART,
	ADD_CART,
	DELETE_CART,
	GET_RETURN_LIST,
} from "../../actions/ReturnAction";
import { ReturnItemsInterfaceState } from "../Types/ReturnItemTypes";
import _ from "lodash";
export const initialState: ReturnItemsInterfaceState = {
	ReturnItems: [],
	ReturnItem: {
		id: "",
		delivered_at: "",
		delivery_method: "regular",
		note: "",
		box_codes: [],
	},
	ReturnList: [],
	Cart: [],
	numberCart: 0,
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	Title: "RETURN ITEM",
	ErrorReturnItem: undefined,
};

export default (
	state = initialState,
	{ type, payload },
): ReturnItemsInterfaceState => {
	switch (type) {
		case SET_RETURN_DATA:
			return {
				...state,
				ReturnItem: payload,
			};
		case GET_RETURN_LIST:
			return {
				...state,
				ReturnList: payload.data,
				Meta: {
					last_page: payload.meta.last_page,
					current_page: payload.meta.current_page,
					total: payload.meta.total_page,
					per_page: payload.meta.total_page,
				},
				ErrorReturnItem: payload.errorMessage,
			};
		case CREATE_RETURN_ITEM:
			return {
				...state,
				ReturnItem: payload?.data?.data,
			};
		case GET_NUMBER_CART:
			return {
				...state,
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
			// const cartStash = [...state.Cart]
			// const deleteSelectedCart = _.remove(cartStash, function (n) {
			// 	return n === payload;
			// })
			return {
				...state,
				numberCart: state.numberCart - 1,
				Cart: state.Cart.filter(Cart => Cart !== payload),
			};
		case RESET_RETURN_LIST:
			return {
				...state,
				ReturnItems: [],
			};
		case RESET_RETURN_FORM:
			return {
				...state,
				ReturnItem: {
					delivered_at: "",
					delivery_method: "regular",
					id: "",
					note: "",
					box_codes: [],
				},
			};
		default:
			return state;
	}
};
