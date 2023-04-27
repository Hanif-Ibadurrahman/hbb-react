import { PaginationState } from "./paginationTypes";
export interface IRoles {
	id: string;
	name: string | null;
	guard_name: string | null;
	created_at: string;
	updated_at: string | null;
}
export interface IUserRoles {
	id: string;
	user_id: string;
	role_id: string;
	created_at: string;
	updated_at: string | null;
	roles: IRoles;
}
export interface IUser {
	id: string;
	username: string | null;
	name: string | null;
	raw_password: string | null;
	nipg: string | null;
	id_role: string | null;
	id_division: string | null;
	id_level: string | null;
	nipg_atasan: string | null;
	nipg_kadiv: string | null;
	id_area: string | null;
	id_satker: string | null;
	id_bisnit: string | null;
	entry_stamp: string | null;
	edit_stamp: string | null;
	del: boolean;
	user_uuid: string | null;
	id_company: string | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	user_roles: IUserRoles[];
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
}

export interface ICreateUserRequest {
	username: string;
	password: string;
	name: string;
	nipg?: string;
	roles: string[];
	id_company: string;
	id_bisnit: string;
	id_area: string;
	id_satker: string;
}

export interface IUpdateUserRequest {
	username: string;
	password: string;
	name: string;
	nipg?: string;
	roles: string[];
	id_company: string;
	id_bisnit: string;
	id_area: string;
	id_satker: string;
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
