import { PaginationState } from "./paginationTypes";
export interface ICondition {
	id: string;
	name: string | null;
}
export interface IConditionPaginateResponse extends PaginationState {
	data: ICondition[];
}
export interface IConditionGetAllParams {
	page?: number;
	page_size?: number;
	name?: string;
}
export interface ICreateConditionRequest {
	name: string;
}
export interface IUpdateConditionRequest {
	name: string;
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
