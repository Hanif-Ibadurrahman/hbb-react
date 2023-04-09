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
	page_size?: number;
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

export interface ICountryInterfaceState {
	countryList: ICountry[] | [];
	title: string;
}

export type CountryContainerState = ICountryInterfaceState;
