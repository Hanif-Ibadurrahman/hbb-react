import { ICompany } from "./companyTypes";
import { PaginationState } from "./paginationTypes";
export interface ISubCodeGroup {
	id: number;
	id_main_group: number;
	value: string | null;
	code: string | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	company: ICompany | null;
}
export interface ISubCodeGroupPaginateResponse extends PaginationState {
	data: ISubCodeGroup[];
}
export interface ISubCodeGroupGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
	group?: string;
	code?: string;
	company?: string;
	id_company?: number;
}
export interface ICreateSubCodeGroupRequest {
	id_main_group: number;
	value: string;
	code: string;
	id_company: number;
}
export interface IUpdateSubCodeGroupRequest {
	id_main_group: number;
	value: string;
	code: string;
	id_company: number;
}
export interface ISubCodeGroupGetAllResponse {
	status: string;
	message: string;
	data: ISubCodeGroupPaginateResponse | null;
}
export interface ISubCodeGroupInterfaceState {
	getAllSubCodeGroupWithPagination: ISubCodeGroupPaginateResponse | null;
	title: string;
}

export type SubCodeGroupContainerState = ISubCodeGroupInterfaceState;
