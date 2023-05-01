import { intersection } from "lodash";
import { TokenDekode } from "../authentication";
import {
	convertListToCRUDPermissionMaster,
	convertListToCRUDPermissionService,
	generateCheckPermissions,
} from "../common";

const tokenDecode = TokenDekode();
const permissions: string[] = Object.values(tokenDecode?.permissions || {});

console.info("permissionOnToken", tokenDecode?.permissions);
console.info("roleOnToken", tokenDecode?.user?.roles);

const listMaster: string[] = [
	"user",
	"country",
	"condition",
	"main-group",
	"sub-group",
	"company",
	"bisnis-unit",
	"area",
	"division",
	"satuan-kerja",
	"employee",
	"color",
	"pengelola",
	"penyedia",
	"location",
	"item",
	"workflow",
	"workflow-detail",
];

const listService: string[] = [
	"pemindahan",
	"penghapusan",
	"perbaikan",
	"permintaan",
	"pengembalian",
	"perubahan",
	"pemeriksaan",
	"penggantian",
];

export const isAllowShowMasterModule = (): boolean => {
	let permissionShow: string[] = [];
	listMaster.forEach(item => {
		permissionShow.push(`read-master-${item}`);
		permissionShow.push(`all-master-${item}`);
	});
	return intersection(permissions, permissionShow).length > 0;
};

export const isAllowShowServiceModule = (): boolean => {
	let permissionShow: string[] = [];
	listService.forEach(item => {
		permissionShow.push(`read-transaksi-${item}`);
		permissionShow.push(`all-transaksi-${item}`);
	});
	return intersection(permissions, permissionShow).length > 0;
};

export const listCRUDPermissionMaster: any =
	convertListToCRUDPermissionMaster(listMaster);

export const listCRUDPermissionService: any =
	convertListToCRUDPermissionService(listService);

console.info("listPermissionMaster", listCRUDPermissionMaster);
console.info("listPermissionService", listCRUDPermissionService);

export const listCheckPermission: any = generateCheckPermissions(permissions, {
	...listCRUDPermissionMaster,
	...listCRUDPermissionService,
});
// Xxx is title case, example: user -> User, sub-group -> SubGroup
// For Service
// isAllowApproveXxx
// isAllowRejectXxx
// isAllowReadServiceXxx
// isAllowCreateServiceXxx
// isAllowUpdateServiceXxx
// isAllowDeleteServiceXxx

// For Master
// isAllowReadMasterXxx
// isAllowCreateMasterXxx
// isAllowUpdateMasterXxx
// isAllowDeleteMasterXxx
