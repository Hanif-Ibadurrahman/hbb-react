import { PaginationState } from "./paginationTypes";
export interface IInventory {
	name: string | null;
	main_group: string | null;
	sub_group: string | null;
	year: string | null;
	serial_no: string | null;
	merk: string | null;
	inventory_type: number | null;
	size: string | null;
	color: string | null;
	tahun_perolehan: string | null;
	location: string | null;
	satker: string | null;
	area: string | null;
	no_akuntansi: string | null;
	penanggung_jawab: string | null;
	ever_transaksi: number | null;
	ever_pindah: number | null;
	ever_hapus: number | null;
	status: number | null;
	kondisi: string | null;
	remark: string | null;
	id: number;
	nipg: string | null;
	code: string | null;
	main_group_name: string | null;
	sub_group_name: string | null;
	bu_name: string | null;
	company_name: string | null;
}

export interface IInventoryDetail extends IInventory {
	id_lokasi: number | null;
	no_bast: string | null;
	date_bast: string | null;
	country: string | null;
	year_made: string | null;
	type: string | null;
	jenis: string | null;
	model: string | null;
	capacity: string | null;
	serial_number: string | null;
	no_polisi: string | null;
	no_rangka: string | null;
	no_mesin: string | null;
	no_bpkb: string | null;
	contract_no: string | null;
	contract_date: string | null;
	price: number | null;
	condition: number | null;
	upload: string | null;
	location_before: string | null;
	is_approved: boolean | null;
	id_main_group: number | null;
	id_sub_group: number | null;
	approve_by: number | null;
	jumlah: number | null;
	id_barang: number | null;
	id_country: number | null;
	id_color: number | null;
	id_area: string | null;
	id_location: number | null;
	id_penanggung_jawab: string | null;
	id_satker: number | null;
	distributor: string | null;
	id_bisnis_unit: number | null;
	id_company: number | null;
	id_division: number | null;
	division_name: string | null;
}
export interface IInventoryPaginateResponse extends PaginationState {
	data: IInventory[];
}

export interface IInventoryPrintQRParams {
	codes?: string;
}

export interface IInventoryGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
	search?: string;
	id_area?: number;
	id_location?: number;
	inventory_type?: number;
	main_group?: string;
	sub_group?: string;
	year?: string;
	name?: string;
	distributor?: string;
	no_akuntansi?: string;
	no_bast?: string;
	country?: string;
	year_made?: string;
	merk?: string;
	model?: string;
	color?: string;
	capacity?: string;
	size?: string;
	serial_number?: string;
	no_polisi?: string;
	no_rangka?: string;
	no_mesin?: string;
	no_bpkb?: string;
	contract_no?: string;
	contract_date?: string;
	bisnis_unit?: string;
	area?: string;
	satker?: string;
	location?: string;
	penanggung_jawab?: string;
	condition?: string;
	rentang_waktu?: string;
	rentang_tahun_perolehan?: string;
	rentang_harga?: string;
	code?: string;
	status?: number;
}

export interface IInventoryInWarehouseParams {
	search?: string;
}

export interface ICreateInventoryRequest {
	id_company: number;
	inventory_type?: number;
	id_main_group: number;
	id_sub_group: number;
	year?: number;
	serial_no: string;
	id_barang: number;
	distributor: string;
	jumlah?: number;
	no_akuntansi: string;
	no_bast: string;
	date_bast: string;
	id_country: number;
	id_division: number;
	year_made?: number;
	merk: string;
	type: string;
	jenis: string;
	model: string;
	id_color: number;
	capacity: string;
	size: string;
	serial_number: string;
	no_polisi: string;
	no_rangka: string;
	no_mesin: string;
	no_bpkb: string;
	contract_no: string;
	contract_date: string;
	price?: number;
	id_bisnis_unit: number;
	id_area: number;
	id_satker: number;
	id_location: number;
	id_penanggung_jawab: number;
	condition: string;
	remark: string;
	files: any | null;
}

export interface IUpdateInventoryRequest {
	id_company: string;
	inventory_type: number;
	id_main_group: string;
	id_sub_group: string;
	year: number;
	serial_no: string;
	id_barang: string;
	distributor: string;
	jumlah: number;
	no_akuntansi: string;
	no_bast: string;
	date_bast: string;
	id_country: string;
	year_made: number;
	merk: string;
	type: string;
	jenis: string;
	model: string;
	id_color: string;
	capacity: string;
	size: string;
	serial_number: string;
	no_polisi: string;
	no_rangka: string;
	no_mesin: string;
	no_bpkb: string;
	contract_no: string;
	contract_date: string;
	price: number;
	id_bisnis_unit: string;
	id_area: string;
	id_satker: string;
	id_location: string;
	id_penanggung_jawab: string;
	condition: string;
	remark: string;
	_method: string;
}

export interface ICheckSerialNumberParams {
	id_main_group?: number;
	id_sub_group?: number;
	year?: string;
}

export interface IInventoryGetAllResponse {
	status: string;
	message: string;
	data: IInventoryPaginateResponse | null;
}

export interface IInventoryInterfaceState {
	getAllInventoryWithPagination: IInventoryPaginateResponse | null;
	title: string;
}

export type InventoryContainerState = IInventoryInterfaceState;
