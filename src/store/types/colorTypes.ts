import { ICompany } from "./companyTypes";
import { PaginationState } from "./paginationTypes";
export interface IColor {
	id: number;
	name: string | null;
	id_company: number | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	company: ICompany | null;
}
export interface IColorPaginateResponse extends PaginationState {
	data: IColor[];
}
export interface IColorGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
	color?: string;
	company?: string;
}
export interface ICreateColorRequest {
	name: string;
	id_company: number | null;
}
export interface IUpdateColorRequest {
	name: string;
	id_company: number | null;
}
export interface IColorGetAllResponse {
	status: string;
	message: string;
	data: IColorPaginateResponse | null;
}
export interface IColorGetAllReducer {
	getAllColorWithPaginate: IColorPaginateResponse | null;
	title: string;
}
export interface IColorViewReducer {
	getColor: IColor | null;
	title: string;
}
export interface IColorState {
	countryGetAllReducer: IColorGetAllReducer | null;
	countryViewReducer: IColorViewReducer | null;
	title: string;
}

export type ColorContainerState = IColorState;
