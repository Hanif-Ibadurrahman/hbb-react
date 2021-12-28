import {
	CREATE_BORROW_ITEM,
	RESET_BORROW_LIST,
	RESET_BORROW_FORM,
	SET_BORROW_DATA,
	GET_NUMBER_CART,
	ADD_CART,
	DELETE_CART,
} from "../../actions/BorrowItemAction";
import { BorrowItemsInterfaceState } from "../Types/BorrowItemTypes";
import _ from "lodash";
export const initialState: BorrowItemsInterfaceState = {
	BorrowItems: [],
	BorrowItem: {
		id: "",
		note: "",
		box_codes: [],
	},
	Cart: [],
	numberCart: 0,
	Meta: {
		Total: 0,
		PerPage: 0,
		CurrentPage: 1,
		LastPage: 1,
	},
	Title: "BORROW ITEM",
	ErrorBorrowItem: undefined,
};

export default (
	state = initialState,
	{ type, payload },
): BorrowItemsInterfaceState => {
	switch (type) {
		case SET_BORROW_DATA:
			return {
				...state,
				BorrowItem: payload,
			};
		case CREATE_BORROW_ITEM:
			return {
				...state,
				BorrowItem: payload?.data?.data,
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
		case RESET_BORROW_LIST:
			return {
				...state,
				BorrowItems: [],
			};
		case RESET_BORROW_FORM:
			return {
				...state,
				BorrowItem: {
					id: "",
					note: "",
					box_codes: [],
				},
			};
		default:
			return state;
	}
};
