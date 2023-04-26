import { PaginationState } from "./paginationTypes";
export interface IColor {
	id: string;
	name: string | null;
}
export interface IColorPaginateResponse extends PaginationState {
	data: IColor[];
}
export interface IColorGetAllParams {
	page?: number;
	per_page?: number;
	name?: string;
}
export interface ICreateColorRequest {
	name: string;
}
export interface IUpdateColorRequest {
	name: string;
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
