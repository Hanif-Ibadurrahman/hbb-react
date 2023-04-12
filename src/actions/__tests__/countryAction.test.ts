import {
	getCountryListAction,
	createNewCountryAction,
	SET_COUNTRY_DATA,
	GET_COUNTRY_LIST,
	PROCESS_FAILED,
	CREATE_NEW_COUNTRY,
} from "../countryAction";
import { getAllCountryApi, createNewCountryApi } from "../../api/country";

// Mock the API functions
jest.mock("../../api/country", () => ({
	getAllCountryApi: jest.fn(),
	createNewCountryApi: jest.fn(),
}));

describe("Country actions", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("getCountryListAction", () => {
		it("dispatches SET_COUNTRY_DATA and GET_COUNTRY_LIST actions with the correct payload", async () => {
			const params = { someParam: "value" };
			const response = {
				data: [
					{ id: 1, name: "Country 1" },
					{ id: 2, name: "Country 2" },
				],
			};
			getAllCountryApi.mockImplementation(() => Promise.resolve(response));
			const dispatch = jest.fn();

			const result = await getCountryListAction(params)(dispatch);

			expect(getAllCountryApi).toHaveBeenCalledWith(params);
			expect(dispatch).toHaveBeenCalledWith({
				type: SET_COUNTRY_DATA,
				payload: params,
			});
			expect(dispatch).toHaveBeenCalledWith({
				type: GET_COUNTRY_LIST,
				payload: response,
			});
			expect(result).toEqual(response);
		});

		it("dispatches PROCESS_FAILED action when the API call fails", async () => {
			const params = { someParam: "value" };
			const error = new Error("Some error");
			getAllCountryApi.mockImplementation(() => Promise.reject(error));
			const dispatch = jest.fn();

			try {
				await getCountryListAction(params)(dispatch);
			} catch (e) {
				expect(getAllCountryApi).toHaveBeenCalledWith(params);
				expect(dispatch).toHaveBeenCalledWith({
					type: SET_COUNTRY_DATA,
					payload: params,
				});
				expect(dispatch).toHaveBeenCalledWith({
					type: PROCESS_FAILED,
					payload: { error },
				});
				expect(e).toEqual(error);
			}
		});
	});

	describe("createNewCountryAction", () => {
		it("dispatches SET_COUNTRY_DATA and CREATE_NEW_COUNTRY actions with the correct payload", async () => {
			const input = { name: "Country 1" };
			const response = { data: { id: 1, name: "Country 1" } };
			createNewCountryApi.mockImplementation(() => Promise.resolve(response));
			const dispatch = jest.fn();

			const result = await createNewCountryAction(input)(dispatch);

			expect(createNewCountryApi).toHaveBeenCalledWith(input);
			expect(dispatch).toHaveBeenCalledWith({
				type: SET_COUNTRY_DATA,
				payload: input,
			});
			expect(dispatch).toHaveBeenCalledWith({
				type: CREATE_NEW_COUNTRY,
				payload: response,
			});
			expect(result).toEqual(response);
		});

		it("dispatches PROCESS_FAILED action when the API call fails", async () => {
			const input = { name: "Country 1" };
			const error = new Error("Some error");
			createNewCountryApi.mockImplementation(() => Promise.reject(error));
			const dispatch = jest.fn();

			try {
				await createNewCountryAction(input)(dispatch);
			} catch (e) {
				expect(createNewCountryApi).toHaveBeenCalledWith(input);
				expect(dispatch).toHaveBeenCalledWith({
					type: SET_COUNTRY_DATA,
					payload: input,
				});
				expect(dispatch).toHaveBeenCalledWith({
					type: PROCESS_FAILED,
					payload: { error },
				});
				expect(e).toEqual(error);
			}
		});
	});
});
