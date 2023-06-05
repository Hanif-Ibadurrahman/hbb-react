import jwtDecode from "jwt-decode";
import {
	DECODE_TOKEN,
	LOGIN_FAILED,
	LOGIN_SUCCESS,
	SET_LOGIN_DATA,
	loginAction,
} from "../loginAction";
import { loginApi } from "../../api/login";

jest.mock("jwt-decode", () => jest.fn());
jest.mock("../../api/login", () => ({
	loginApi: jest.fn(),
}));

describe("Login actions", () => {
	afterEach(() => {
		jest.resetAllMocks();
		sessionStorage.clear();
	});

	it("dispatches SET_LOGIN_DATA, LOGIN_SUCCESS, and DECODE_TOKEN actions with the correct payload", async () => {
		const data = { username: "user", password: "pass" };
		const token = "some-token";
		const decodedToken = { someData: "value" };
		const response = { data: { token } };
		loginApi.mockImplementation(() => Promise.resolve(response));
		jwtDecode.mockImplementation(() => decodedToken);
		const dispatch = jest.fn();

		const result = await loginAction(data)(dispatch);

		Object.defineProperty(window.document, "cookie", {
			writable: true,
			value: token,
		});

		expect(loginApi).toHaveBeenCalledWith(data);
		expect(dispatch).toHaveBeenCalledWith({
			type: SET_LOGIN_DATA,
			payload: data,
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: LOGIN_SUCCESS,
			payload: token,
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: DECODE_TOKEN,
			payload: decodedToken,
		});
		expect(result).toEqual(decodedToken);
		expect(document.cookie).toEqual(token);
	});

	it("dispatches LOGIN_FAILED action when the API call fails", async () => {
		const data = { username: "user", password: "pass" };
		const error = new Error("Some error");
		loginApi.mockImplementation(() => Promise.reject(error));
		const dispatch = jest.fn();

		try {
			await loginAction(data)(dispatch);
		} catch (e) {
			expect(loginApi).toHaveBeenCalledWith(data);
			expect(dispatch).toHaveBeenCalledWith({
				type: LOGIN_FAILED,
				payload: { data: false, errorMessage: error?.message },
			});
			expect(e).toEqual(error);
		}
	});
});
