import { PaginationState } from "./paginationTypes";
export interface ICodeGroup {
	id: string;
	value: string | null;
	code: string | null;
}
export interface ICodeGroupPaginateResponse extends PaginationState {
	data: ICodeGroup[];
}

export interface ICodeGroupGetAllParams {
	page?: number;
	per_page?: number;
	value?: string;
	code?: string;
}
export interface ICreateCodeGroupRequest {
	value: string;
	code: string;
}

export interface IUpdateCodeGroupRequest {
	value: string;
	code: string;
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
