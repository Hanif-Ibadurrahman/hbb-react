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
	upload: string | null;
	id_area: number | null;
	id_division_head: number | null;
	created_by: number | null;
	tipe: string | null;
	id_company: number | null;
	id_approval: number | null;
	inventory_description: string | null;
	spesification: string | null;
	attachment_file: string | null;
	condition: string | null;
	transaction_uuid: string | null;
	inventory_code: string | null;
	id_inventory: number | null;
	no_urut: number | null;
	created_at: string | null;
	updated_at: string | null;
	deleted_at: string | null;
	id_final_location: number | null;
	company_name: string | null;
	inventory_name: string | null;
	area_name: string | null;
	lokasi_name: string | null;
	total_flow: number | null;
	pending_status: string | null;
	current_flow: number | null;
	current_approver: number | null;
	reject_status: string | null;
	is_closed_by: string | null;
}
export interface IServiceRequestPaginateResponse extends PaginationState {
	data: IServiceRequest[];
}
export interface IServiceRequestGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
	inventory_code?: string;
	inventory_description?: string;
	nama_pemakai?: string;
	condition?: string;
}
export interface ICreateServiceRequestRequest {
	inventory_code: string;
	inventory_description: string;
	uraian: string;
	condition: string;
	nama_pemakai: string;
	spesification: string;
	id_company: number;
	id_workflow: number;
	id_final_location: number;
	created_by: number;
	files: any | null;

	area: string;
	location: string;
}
export interface IUpdateServiceRequestRequest {
	inventory_code: string;
	inventory_description: string;
	uraian: string;
	condition: string;
	nama_pemakai: string;
	spesification: string;
	id_company: number;
	id_workflow: number;
	id_final_location: number;
	created_by: number;
	files: any | null;
	_method: string;

	area: string;
	location: string;
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
