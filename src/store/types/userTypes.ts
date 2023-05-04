import { PaginationState } from "./paginationTypes";
export interface IRoles {
	id: number;
	name: string | null;
	guard_name: string | null;
	created_at: string;
	updated_at: string | null;
}
export interface IUserRoles {
	id: number;
	user_id: number;
	role_id: number;
	created_at: string;
	updated_at: string | null;
	roles: IRoles;
}
export interface IUser {
	id: number;
	username: string | null;
	name: string | null;
	raw_password: string | null;
	nipg: string | null;
	id_role: number | null;
	id_division: number | null;
	id_level: number | null;
	nipg_atasan: string | null;
	nipg_kadiv: string | null;
	id_area: number | null;
	id_satker: number | null;
	id_bisnit: number | null;
	entry_stamp: string | null;
	edit_stamp: string | null;
	del: boolean;
	user_uuid: number | null;
	id_company: number | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	user_roles: IUserRoles[];
	id_emp: number | null;
	email: string | null;
	company_name: string | null;
	bisnis_unit_name: string | null;
	area_name: string | null;
	satker_name: string | null;
	emp_name: string | null;
}

export interface IUserPaginateResponse extends PaginationState {
	data: IUser[];
}

export interface IUserGetAllParams {
	page?: number;
	per_page?: number;
	name?: string;
	bisnis_unit?: string;
	area?: string;
	role?: string;
	company?: string;
}

export interface ICreateUserRequest {
	email: string;
	username: string;
	password: string;
	name: string;
	nipg: string;
	roles: number[];
	id_company: number;
	id_bisnit: number;
	id_area: number;
	id_satker: number;
	id_emp: number;
}

export interface IUpdateUserRequest {
	email: string;
	username: string;
	password: string;
	name: string;
	nipg: string;
	roles: number[];
	id_company: number;
	id_bisnit: number;
	id_area: number;
	id_satker: number;
	id_emp: number;
}

export interface IUserGetAllResponse {
	status: string;
	message: string;
	data: IUserPaginateResponse | null;
}

export interface IUserInterfaceState {
	getAllUserWithPagination: IUserPaginateResponse | null;
	title: string;
}

export type UserContainerState = IUserInterfaceState;
