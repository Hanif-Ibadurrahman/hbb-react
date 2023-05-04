import { ICompany } from "./companyTypes";
import { PaginationState } from "./paginationTypes";
export interface ICondition {
	id: number;
	name: string | null;
	id_company: number | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	company: ICompany | null;
}
export interface IConditionPaginateResponse extends PaginationState {
	data: ICondition[];
}
export interface IConditionGetAllParams {
	page?: number;
	per_page?: number;
	name?: string;
}
export interface ICreateConditionRequest {
	name: string;
	id_company: number;
}
export interface IUpdateConditionRequest {
	name: string;
	id_company: number;
}
export interface IConditionGetAllResponse {
	status: string;
	message: string;
	data: IConditionPaginateResponse | null;
}
export interface IConditionInterfaceState {
	getAllConditionWithPaginate: IConditionPaginateResponse | null;
	title: string;
}

export type ConditionContainerState = IConditionInterfaceState;
