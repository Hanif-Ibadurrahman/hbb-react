import { TokenDekode } from "../authentication";
import { intersection } from "lodash";

const tokenDecode = TokenDekode();
const permissions = Object.values(tokenDecode.permissions || {});

console.info(tokenDecode);

export const permissionShowMaster = [
	"read-master-user",
	"read-master-country",
	"read-master-condition",
	"read-master-main-group",
	"read-master-sub-group",
	"read-master-company",
	"read-master-bisnis-unit",
	"read-master-area",
	"read-master-division",
	"read-master-satuan-kerja",
	"all-master-employee",
	"all-master-color",
	"all-master-pengelola",
	"all-master-penyedia",
	"all-master-location",
	"all-master-item",
	"all-master-workflow",
	"all-master-workflow-detail",
];

export const permissionShowService = [
	"read-transaksi-pemindahan",
	"all-transaksi-penghapusan",
	"all-transaksi-perbaikan",
	"all-transaksi-permintaan",
	"all-transaksi-pengembalian",
	"all-transaksi-perubahan",
	"all-transaksi-pemeriksaan",
	"all-transaksi-penggantian",
];

export const permissionApproveServiceChange = [
	"approval-all",
	"approval-perubahan",
];

export const permissionRejectServiceChange = ["reject-all", "reject-perubahan"];

export const permissionApproveServiceDelete = [
	"approval-all",
	"approval-penghapusan",
];

export const permissionApproveServiceDisplacement = [
	"approval-all",
	"approval-pemindahan",
];

export const permissionRejectServiceDisplacement = [
	"reject-all",
	"reject-pemindahan",
];

export const permissionRejectServiceDelete = [
	"reject-all",
	"reject-penghapusan",
];

export const permissionApproveServiceInspection = [
	"approval-all",
	"approval-pemeriksaan",
];

export const permissionRejectServiceInspection = [
	"reject-all",
	"reject-pemeriksaan",
];

export const permissionApproveServiceRepair = [
	"approval-all",
	"approval-perbaikan",
];

export const permissionRejectServiceRepair = ["reject-all", "reject-perbaikan"];

export const permissionApproveServiceReplacement = [
	"approval-all",
	"approval-penggantian",
];

export const permissionRejectServiceReplacement = [
	"reject-all",
	"reject-penggantian",
];

export const permissionApproveServiceRequest = [
	"approval-all",
	"approval-permintaan",
];

export const permissionRejectServiceRequest = [
	"reject-all",
	"reject-permintaan",
];

export const permissionApproveServiceReturn = [
	"approval-all",
	"approval-pengembalian",
];

export const permissionRejectServiceReturn = [
	"reject-all",
	"reject-pengembalian",
];

export const permissionCreateServiceChange = [
	"create-transaksi-perubahan",
	"all-transaksi-perubahan",
];

export const permissionUpdateServiceChange = [
	"update-transaksi-perubahan",
	"all-transaksi-perubahan",
];

export const permissionDeleteServiceChange = [
	"delete-transaksi-perubahan",
	"all-transaksi-perubahan",
];

export const permissionCreateServiceDelete = [
	"create-transaksi-penghapusan",
	"all-transaksi-penghapusan",
];

export const permissionUpdateServiceDelete = [
	"update-transaksi-penghapusan",
	"all-transaksi-penghapusan",
];

export const permissionDeleteServiceDelete = [
	"delete-transaksi-penghapusan",
	"all-transaksi-penghapusan",
];

export const permissionCreateServiceDisplacement = [
	"create-transaksi-pemindahan",
	"all-transaksi-pemindahan",
];

export const permissionUpdateServiceDisplacement = [
	"update-transaksi-pemindahan",
	"all-transaksi-pemindahan",
];

export const permissionDeleteServiceDisplacement = [
	"delete-transaksi-pemindahan",
	"all-transaksi-pemindahan",
];

export const permissionCreateServiceInspection = [
	"create-transaksi-pemeriksaan",
	"all-transaksi-pemeriksaan",
];

export const permissionUpdateServiceInspection = [
	"update-transaksi-pemeriksaan",
	"all-transaksi-pemeriksaan",
];

export const permissionDeleteServiceInspection = [
	"delete-transaksi-pemeriksaan",
	"all-transaksi-pemeriksaan",
];

export const permissionCreateServiceRepair = [
	"create-transaksi-perbaikan",
	"all-transaksi-perbaikan",
];

export const permissionUpdateServiceRepair = [
	"update-transaksi-perbaikan",
	"all-transaksi-perbaikan",
];

export const permissionDeleteServiceRepair = [
	"delete-transaksi-perbaikan",
	"all-transaksi-perbaikan",
];

export const permissionCreateServiceReplacement = [
	"create-transaksi-penggantian",
	"all-transaksi-penggantian",
];

export const permissionUpdateServiceReplacement = [
	"update-transaksi-penggantian",
	"all-transaksi-penggantian",
];

export const permissionDeleteServiceReplacement = [
	"delete-transaksi-penggantian",
	"all-transaksi-penggantian",
];

export const permissionCreateServiceRequest = [
	"create-transaksi-permintaan",
	"all-transaksi-permintaan",
];

export const permissionUpdateServiceRequest = [
	"update-transaksi-permintaan",
	"all-transaksi-permintaan",
];

export const permissionDeleteServiceRequest = [
	"delete-transaksi-permintaan",
	"all-transaksi-permintaan",
];

export const permissionCreateServiceReturn = [
	"create-transaksi-pengembalian",
	"all-transaksi-pengembalian",
];

export const permissionUpdateServiceReturn = [
	"update-transaksi-pengembalian",
	"all-transaksi-pengembalian",
];

export const permissionDeleteServiceReturn = [
	"delete-transaksi-pengembalian",
	"all-transaksi-pengembalian",
];

// Sidebar
export const isAllowShowMasterSidebar: boolean =
	intersection(permissions, permissionShowMaster).length > 0;

export const isAllowShowServiceSidebar: boolean =
	intersection(permissions, permissionShowService).length > 0;

// Approve & Reject
export const isAllowApproveServiceChange: boolean =
	intersection(permissions, permissionApproveServiceChange).length > 0;

export const isAllowRejectServiceChange: boolean =
	intersection(permissions, permissionRejectServiceChange).length > 0;

export const isAllowApproveServiceDelete: boolean =
	intersection(permissions, permissionApproveServiceDelete).length > 0;

export const isAllowRejectServiceDelete: boolean =
	intersection(permissions, permissionRejectServiceDelete).length > 0;

export const isAllowApproveServiceDisplacement: boolean =
	intersection(permissions, permissionApproveServiceDisplacement).length > 0;

export const isAllowRejectServiceDisplacement: boolean =
	intersection(permissions, permissionRejectServiceDisplacement).length > 0;

export const isAllowApproveServiceInspection: boolean =
	intersection(permissions, permissionApproveServiceInspection).length > 0;

export const isAllowRejectServiceInspection: boolean =
	intersection(permissions, permissionRejectServiceInspection).length > 0;

export const isAllowApproveServiceRepair: boolean =
	intersection(permissions, permissionApproveServiceRepair).length > 0;

export const isAllowRejectServiceRepair: boolean =
	intersection(permissions, permissionRejectServiceRepair).length > 0;

export const isAllowApproveServiceReplacement: boolean =
	intersection(permissions, permissionApproveServiceReplacement).length > 0;

export const isAllowRejectServiceReplacement: boolean =
	intersection(permissions, permissionRejectServiceReplacement).length > 0;

export const isAllowApproveServiceRequest: boolean =
	intersection(permissions, permissionApproveServiceRequest).length > 0;

export const isAllowRejectServiceRequest: boolean =
	intersection(permissions, permissionRejectServiceRequest).length > 0;

export const isAllowApproveServiceReturn: boolean =
	intersection(permissions, permissionApproveServiceReturn).length > 0;

export const isAllowRejectServiceReturn: boolean =
	intersection(permissions, permissionRejectServiceReturn).length > 0;

// CRUD
export const isAllowCreateServiceChange: boolean =
	intersection(permissions, permissionCreateServiceChange).length > 0;

export const isAllowUpdateServiceChange: boolean =
	intersection(permissions, permissionUpdateServiceChange).length > 0;

export const isAllowDeleteServiceChange: boolean =
	intersection(permissions, permissionDeleteServiceChange).length > 0;

export const isAllowCreateServiceDelete: boolean =
	intersection(permissions, permissionCreateServiceDelete).length > 0;

export const isAllowUpdateServiceDelete: boolean =
	intersection(permissions, permissionUpdateServiceDelete).length > 0;

export const isAllowDeleteServiceDelete: boolean =
	intersection(permissions, permissionDeleteServiceDelete).length > 0;

export const isAllowCreateServiceDisplacement: boolean =
	intersection(permissions, permissionCreateServiceDisplacement).length > 0;

export const isAllowUpdateServiceDisplacement: boolean =
	intersection(permissions, permissionUpdateServiceDisplacement).length > 0;

export const isAllowDeleteServiceDisplacement: boolean =
	intersection(permissions, permissionDeleteServiceDisplacement).length > 0;

export const isAllowCreateServiceInspection: boolean =
	intersection(permissions, permissionCreateServiceInspection).length > 0;

export const isAllowUpdateServiceInspection: boolean =
	intersection(permissions, permissionUpdateServiceInspection).length > 0;

export const isAllowDeleteServiceInspection: boolean =
	intersection(permissions, permissionDeleteServiceInspection).length > 0;

export const isAllowCreateServiceRepair: boolean =
	intersection(permissions, permissionCreateServiceRepair).length > 0;

export const isAllowUpdateServiceRepair: boolean =
	intersection(permissions, permissionUpdateServiceRepair).length > 0;

export const isAllowDeleteServiceRepair: boolean =
	intersection(permissions, permissionDeleteServiceRepair).length > 0;

export const isAllowCreateServiceReplacement: boolean =
	intersection(permissions, permissionCreateServiceReplacement).length > 0;

export const isAllowUpdateServiceReplacement: boolean =
	intersection(permissions, permissionUpdateServiceReplacement).length > 0;

export const isAllowDeleteServiceReplacement: boolean =
	intersection(permissions, permissionDeleteServiceReplacement).length > 0;

export const isAllowCreateServiceRequest: boolean =
	intersection(permissions, permissionCreateServiceRequest).length > 0;

export const isAllowUpdateServiceRequest: boolean =
	intersection(permissions, permissionUpdateServiceRequest).length > 0;

export const isAllowDeleteServiceRequest: boolean =
	intersection(permissions, permissionDeleteServiceRequest).length > 0;

export const isAllowCreateServiceReturn: boolean =
	intersection(permissions, permissionCreateServiceReturn).length > 0;

export const isAllowUpdateServiceReturn: boolean =
	intersection(permissions, permissionUpdateServiceReturn).length > 0;

export const isAllowDeleteServiceReturn: boolean =
	intersection(permissions, permissionDeleteServiceReturn).length > 0;
