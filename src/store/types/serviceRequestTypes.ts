import { PaginationState } from "./paginationTypes";
export interface IServiceRequest {
	id: number;
	nipg: string | null;
	date: string | null;
	remark: string | null;
	uraian: string | null;
	approve_by: number | null;
	status: number | null;
	entry_stamp: string | null;
	edit_stamp: string | null;
	del: boolean | null;
	reject: string | null;
	date_start: string | null;
	date_order: string | null;
	date_end: string | null;
	permintaan_layanan: string | null;
	tindak_lanjut: string | null;
	ekskutor: string | null;
	nama_peminta: string | null;
	nama_pemakai: string | null;
	id_division_head: number | null;
	upload: string | null;
	id_area: number | null;
	id_role: number | null;
	created_by: number | null;
	tipe: string | null;
	id_company: number | null;
	id_approval: number | null;
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
	id_company: number;
	id_workflow: number;
	created_by: number;
	files: any | null;
}
export interface IUpdateServiceRequestRequest {
	inventory_description: string;
	uraian: string;
	condition: string;
	nama_pemakai: string;
	spesification: string;
	id_company: number;
	id_workflow: number;
	created_by: number;
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
