import { PaginationState } from "./paginationTypes";
export interface IWorkflow {
	id: string;
	name: string | null;
	description: string | null;
	created_at: string | null;
	deleted_at: string | null;
	id_bisnis_unit: string | null;
	id_area: string | null;
	id_satuan_kerja: string | null;
	id_company: string | null;
	is_reverse: boolean;
}
export interface IWorkflowPaginateResponse extends PaginationState {
	data: IWorkflow[];
}
export interface IWorkflowGetAllParams {
	page?: number;
	per_page?: number;
	name?: string;
	description?: string;
	created_at?: string;
	roles?: string[];
}
export interface ICreateWorkflowRequest {
	name: string;
	description: string;
	created_at: string;
	id_company: string;
	roles?: string[];
	is_reverse: boolean;
}
export interface IUpdateWorkflowRequest {
	name: string;
	description: string;
	created_at: string;
	id_company: string;
	roles?: string[];
	is_reverse: boolean;
}
export interface IWorkflowGetAllResponse {
	status: string;
	message: string;
	data: IWorkflowPaginateResponse | null;
}
export interface IWorkflowInterfaceState {
	getAllWorkflowWithPagination: IWorkflowPaginateResponse | null;
	title: string;
}

export type WorkflowContainerState = IWorkflowInterfaceState;
