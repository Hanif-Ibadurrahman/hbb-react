import { PaginationState } from "./paginationTypes";
export interface IServiceRequest {
	id: string;
	nipg: string | null;
	date: string | null;
	remark: string | null;
	uraian: string | null;
	approve_by: string | null;
	status: string | null;
	entry_stamp: string | null;
	edit_stamp: string | null;
	del: string | null;
	reject: string | null;
	date_start: string | null;
	date_order: string | null;
	date_end: string | null;
	permintaan_layanan: string | null;
	tindak_lanjut: string | null;
	ekskutor: string | null;
	nama_peminta: string | null;
	nama_pemakai: string | null;
	id_division_head: string | null;
	upload: string | null;
	id_area: string | null;
	id_role: string | null;
	created_by: string | null;
	tipe: string | null;
	id_company: string | null;
	id_approval: string | null;
	inventory_description: string | null;
	spesification: string | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	attachment_file: string | null;
	condition: string | null;
}
export interface IServiceRequestPaginateResponse extends PaginationState {
	data: IServiceRequest[];
}
export interface IServiceRequestGetAllParams {
	page?: number;
	per_page?: number;
	uraian?: string;
	condition?: string;
	nama_pemakai?: string;
	spesification?: string;
}
export interface ICreateServiceRequestRequest {
	inventory_description: string;
	uraian: string;
	condition: string;
	nama_pemakai: string;
	spesification: string;
	id_company: string;
	id_workflow: string;
	created_by: string;
	files: any | null;
}
export interface IUpdateServiceRequestRequest {
	inventory_description: string;
	uraian: string;
	condition: string;
	nama_pemakai: string;
	spesification: string;
	id_company: string;
	id_workflow: string;
	created_by: string;
	files: any | null;
}
export interface IServiceRequestGetAllResponse {
	status: string;
	message: string;
	data: IServiceRequestPaginateResponse | null;
}
export interface IServiceRequestInterfaceState {
	getAllServiceRequestWithPagination: IServiceRequestPaginateResponse | null;
	title: string;
}

export type ServiceRequestContainerState = IServiceRequestInterfaceState;
