import { PaginationState } from "./paginationTypes";
export interface ISubCodeGroup {
	id: string;
	id_main_group: string | null;
	value: string | null;
	code: string | null;
}
export interface ISubCodeGroupPaginateResponse extends PaginationState {
	data: ISubCodeGroup[];
}
export interface ISubCodeGroupGetAllParams {
	page?: number;
	page_size?: number;
	value?: string;
	code?: string;
}
export interface ICreateSubCodeGroupRequest {
	id_main_group: string;
	value: string;
	code: string;
}
export interface IUpdateSubCodeGroupRequest {
	id_main_group: string;
	value: string;
	code: string;
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
