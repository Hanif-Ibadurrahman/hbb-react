import { GET_CLASSIFICATION_LIST } from "../../actions/ClassificationAction";
import { ClassificationsInterfaceState } from "store/Types/ClassificationTypes";

export const initialState: ClassificationsInterfaceState = {
	Classifications: [],
	Classification: {
		id: "",
		name: "",
		type: "",
		code: "",
		retention_period: "",
	},
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	Title: "CLASSIFICATION",
};

export default (
	state = initialState,
	{ type, payload },
): ClassificationsInterfaceState => {
	switch (type) {
		case GET_CLASSIFICATION_LIST:
			return {
				...state,
				Classifications: payload?.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
			};
		default:
			return state;
	}
};
