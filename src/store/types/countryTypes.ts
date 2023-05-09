import { ICompany } from "./companyTypes";
import { PaginationState } from "./paginationTypes";
export interface ICountry {
	id: number;
	name: string | null;
	id_company: number | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	company: ICompany | null;
}
export interface ICountryPaginateResponse extends PaginationState {
	data: ICountry[];
}
export interface ICountryGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
	name?: string;
	company?: string;
}
export interface ICreateCountryRequest {
	name: string;
	id_company: number;
}
export interface IUpdateCountryRequest {
	name: string;
	id_company: number;
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
