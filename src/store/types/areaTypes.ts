import { IBusinessUnit } from "./businessUnitTypes";
import { PaginationState } from "./paginationTypes";
export interface IArea {
	id: number;
	id_bisnis_unit: number | null;
	id_emp: number | null;
	id_company: number | null;
	name: string | null;
	daerah: string | null;
	pemegang: string | null;
	from_opname: boolean | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	bisnis_unit: IBusinessUnit | null;
}

export interface IAreaPaginateResponse extends PaginationState {
	data: IArea[];
}
export interface IAreaGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
	name?: string;
	nipg?: string;
	daerah?: string;
	pemegang?: string;
	pengelola?: string;
	bisnis_unit?: string;
	company?: string;
	id_company?: number;
	id_bisnis_unit?: number;
}
export interface ICreateAreaRequest {
	name: string;
	daerah: string;
	pemegang: string;
	id_bisnis_unit: number;
	id_company: number;
	id_emp: number;
}
export interface IUpdateAreaRequest {
	name: string;
	daerah: string;
	pemegang: string;
	id_bisnis_unit: number;
	id_company: number;
	id_emp: number;
}
export interface IAreaGetAllResponse {
	status: string;
	message: string;
	data: IAreaPaginateResponse | null;
}
export interface IAreaInterfaceState {
	getAllAreaWithPagination: IAreaPaginateResponse | null;
	title: string;
}

export type AreaContainerState = IAreaInterfaceState;
