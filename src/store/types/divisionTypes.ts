import { IArea } from "./areaTypes";
import { IBusinessUnit } from "./businessUnitTypes";
import { ICompany } from "./companyTypes";
import { PaginationState } from "./paginationTypes";
import { IWorkUnit } from "./workUnitTypes";
export interface IDivision {
	id: number;
	id_bisnis_unit: number | null;
	id_area: number | null;
	id_satker: number | null;
	id_company: number | null;
	name: string | null;
	bisnis_unit: IBusinessUnit | null;
	area: IArea | null;
	satker: IWorkUnit | null;
	company: ICompany | null;
}

export interface IDivisionPaginateResponse extends PaginationState {
	data: IDivision[];
}
export interface IDivisionGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
	name?: string;
	satker?: string;
	kepala_satker?: string;
	id_company?: number;
	id_bisnis_unit?: number;
	id_area?: number;
	id_satker?: number;
}
export interface ICreateDivisionRequest {
	name: string;
	id_bisnis_unit: number;
	id_area: number;
	id_satker: number;
	id_company: number;
}
export interface IUpdateDivisionRequest {
	name: string;
	id_bisnis_unit: number;
	id_area: number;
	id_satker: number;
	id_company: number;
}
export interface IDivisionGetAllResponse {
	status: string;
	message: string;
	data: IDivisionPaginateResponse | null;
}
export interface IDivisionInterfaceState {
	getAllDivisionWithPagination: IDivisionPaginateResponse | null;
	title: string;
}

export type DivisionContainerState = IDivisionInterfaceState;
