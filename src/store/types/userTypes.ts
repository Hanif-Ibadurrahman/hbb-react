import { PaginationState } from "./paginationTypes";

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
	del: number | null;
	role_id: string | null;
	user_uuid: string | null;
	id_company: string | null;
}

export interface IUserPaginateResponse extends PaginationState {
	data: IUser[];
}

export interface IUserGetAllParams {
	page?: number;
	page_size?: number;
	name?: string;
}

export interface ICreateUserRequest {
	username: string;
	password: string;
	name: string;
	nipg: string;
	id_role: string;
	id_company: string;
}

export interface IUpdateUserRequest {
	username: string;
	password: string;
	name: string;
	nipg: string;
	id_role: string;
	id_company: string;
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
