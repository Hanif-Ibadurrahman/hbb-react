import { PaginationState } from "./paginationTypes";

export interface IServiceRepair {
	id: string;
	id_quest: string | null;
	nipg: string | null;
	id_inventory: string | null;
	date: string | null;
	condition: string | null;
	remark: string | null;
	approve_by: string | null;
	status: string | null;
	entry_stamp: string | null;
	edit_stamp: string | null;
	approved_date: string | null;
	del: boolean;
	attachment_file: string | null;
	addition: string | null;
	date_start: string | null;
	date_end: string | null;
	date_order: string | null;
	permintaan_layanan: string | null;
	tindak_lanjut: string | null;
	eksekutor: string | null;
	reject: string | null;
	description: string | null;
	from_mobile: boolean;
	tipe: string | null;
	id_kasatker: string | null;
	id_area: string | null;
	id_company: string | null;
	id_approval: string | null;
	inventory_code: string | null;
	spesification: string | null;
	emp_name: string | null;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
	created_by: string | null;
}

export interface IServiceRepairPaginateResponse extends PaginationState {
	data: IServiceRepair[];
}

export interface IServiceRepairGetAllParams {
	page?: number;
	per_page?: number;
	inventory_code?: string;
	description?: string;
	condition?: string;
	emp_name?: string;
	spesification?: string;
}

export interface ICreateServiceRepairRequest {
	inventory_code: string;
	description: string;
	condition: string;
	emp_name: string;
	spesification: string;
	id_company: string;
	id_workflow: string;
	created_by: string;
	files: any | null;
}

export interface IUpdateServiceRepairRequest {
	inventory_code: string;
	description: string;
	condition: string;
	emp_name: string;
	spesification: string;
	id_company: string;
	id_workflow: string;
	created_by: string;
	files: any | null;
}

export interface IServiceRepairGetAllResponse {
	status: string;
	message: string;
	data: IServiceRepairPaginateResponse | null;
}

export interface IServiceRepairInterfaceState {
	getAllServiceRepairWithPagination: IServiceRepairPaginateResponse | null;
	title: string;
}

export type ServiceRepairContainerState = IServiceRepairInterfaceState;
