import { ICompany } from "./companyTypes";
import { PaginationState } from "./paginationTypes";
export interface ICodeGroup {
	id: number;
	value: string | null;
	code: string | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	id_company: number | null;
	company: ICompany | null;
}
export interface ICodeGroupPaginateResponse extends PaginationState {
	data: ICodeGroup[];
}

export interface ICodeGroupGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
	group?: string;
	code?: string;
	id_company?: number;
	company?: string;
}
export interface ICreateCodeGroupRequest {
	value: string;
	code: string;
	id_company: number;
}

export interface IUpdateCodeGroupRequest {
	value: string;
	code: string;
	id_company: number;
}
export interface ICodeGroupGetAllResponse {
	status: string;
	message: string;
	data: ICodeGroupPaginateResponse | null;
}
export interface ICodeGroupInterfaceState {
	getAllCodeGroupWithPagination: ICodeGroupPaginateResponse | null;
	title: string;
}

export type CodeGroupContainerState = ICodeGroupInterfaceState;
