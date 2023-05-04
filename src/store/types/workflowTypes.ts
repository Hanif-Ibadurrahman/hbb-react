import { ICompany } from "./companyTypes";
import { PaginationState } from "./paginationTypes";
export interface IWorkflow {
	id: number;
	name: string | null;
	description: string | null;
	roles: string | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	id_company: string | null;
	is_reverse: boolean;
	company: ICompany | null;
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
	roles?: number[];
}
export interface ICreateWorkflowRequest {
	name: string;
	description: string;
	created_at: string;
	id_company: string;
	roles?: number[];
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
