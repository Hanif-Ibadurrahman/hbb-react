import { PaginationState } from "./paginationTypes";
export interface IEmployee {
	id: number;
	nipg: string | null;
	emp_name: string | null;
	position: string | null;
}
export interface IEmployeePaginateResponse extends PaginationState {
	data: IEmployee[];
}
export interface IEmployeeGetAllParams {
	page?: number;
	per_page?: number;
	nipg?: string;
	emp_name?: string;
	position?: string;
}
export interface ICreateEmployeeRequest {
	nipg: string;
	emp_name: string;
	position: string;
	id_company: number;
}
export interface IUpdateEmployeeRequest {
	nipg: string;
	emp_name: string;
	position: string;
	id_company: number;
}
export interface IEmployeeGetAllResponse {
	status: string;
	message: string;
	data: IEmployeePaginateResponse | null;
}
export interface IEmployeeInterfaceState {
	getAllEmployeeWithPagination: IEmployeePaginateResponse | null;
	title: string;
}

export type EmployeeContainerState = IEmployeeInterfaceState;
