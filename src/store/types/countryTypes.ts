import { PaginationState } from "./paginationTypes";
export interface ICountry {
	id: string;
	name: string | null;
}
export interface ICountryPaginateResponse extends PaginationState {
	data: ICountry[];
}
export interface ICountryGetAllParams {
	page?: number;
	per_page?: number;
	name?: string;
}
export interface ICreateCountryRequest {
	name: string;
}
export interface IUpdateCountryRequest {
	name: string;
}
export interface ICountryGetAllResponse {
	status: string;
	message: string;
	data: ICountryPaginateResponse | null;
}
export interface ICountryGetAllReducer {
	getAllCountryWithPaginate: ICountryPaginateResponse | null;
	title: string;
}
export interface ICountryViewReducer {
	getCountry: ICountry | null;
	title: string;
}
export interface ICountryState {
	countryGetAllReducer: ICountryGetAllReducer | null;
	countryViewReducer: ICountryViewReducer | null;
	title: string;
}

export type CountryContainerState = ICountryState;
