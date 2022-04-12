import {
	CREATE_PICK_UP_ITEM,
	RESET_PICK_UP_LIST,
	RESET_PICK_UP_FORM,
	SET_PICK_UP_DATA,
	GET_NUMBER_CART,
	ADD_CART,
	DELETE_CART,
	GET_PICK_UP_LIST,
	GET_APPROVE_ADMIN_LIST,
} from "../../actions/PickUpAction";
import { PickUpItemsInterfaceState } from "../Types/PickUpTypes";
import _ from "lodash";
export const initialState: PickUpItemsInterfaceState = {
	PickUpItems: [],
	PickUpItem: {
		id: "",
		delivered_at: "",
		delivery_method: "regular",
		box_codes: [],
	},
	PickUpItemList: [],
	Cart: [],
	numberCart: 0,
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	Title: "PickUp ITEM",
	ErrorPickUpItem: undefined,
};

export default (
	state = initialState,
	{ type, payload },
): PickUpItemsInterfaceState => {
	switch (type) {
		case SET_PICK_UP_DATA:
			return {
				...state,
				PickUpItem: payload,
			};
		case GET_PICK_UP_LIST:
			return {
				...state,
				PickUpItemList: payload.data,
				Meta: {
					last_page: payload.meta.last_page,
					current_page: payload.meta.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorPickUpItem: payload.errorMessage,
			};
		case GET_APPROVE_ADMIN_LIST:
			return {
				...state,
				PickUpItemList: payload.data,
				Meta: {
					last_page: payload.meta.last_page,
					current_page: payload.meta.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorPickUpItem: payload.errorMessage,
			};
		case CREATE_PICK_UP_ITEM:
			return {
				...state,
				PickUpItem: payload?.data?.data,
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
		case RESET_PICK_UP_LIST:
			return {
				...state,
				PickUpItems: [],
			};
		case RESET_PICK_UP_FORM:
			return {
				...state,
				PickUpItem: {
					delivered_at: "",
					delivery_method: "regular",
					id: "",
					box_codes: [],
				},
			};
		default:
			return state;
	}
};
