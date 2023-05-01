import { intersection } from "lodash";

export const generateRandomHex = (length: number): string => {
	const chars = "0123456789abcdef";
	let result = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * chars.length);
		result += chars[randomIndex];
	}
	return result;
};

export const convertListToCRUDPermissionMaster = (listMaster: string[]) => {
	const listPermissionCRUD = {};

	listMaster.forEach(item => {
		const itemTitleCase = item
			.replace(/(-\w)/g, m => m[1].toUpperCase())
			.replace(/^\w/, c => c.toUpperCase());
		const permissionRead = `permissionReadMaster${itemTitleCase}`;
		const permissionCreate = `permissionCreateMaster${itemTitleCase}`;
		const permissionUpdate = `permissionUpdateMaster${itemTitleCase}`;
		const permissionDelete = `permissionDeleteMaster${itemTitleCase}`;
		const permissionAll = `all-master-${item}`;

		listPermissionCRUD[permissionRead] = [`read-master-${item}`, permissionAll];
		listPermissionCRUD[permissionCreate] = [
			`create-master-${item}`,
			permissionAll,
		];
		listPermissionCRUD[permissionUpdate] = [
			`update-master-${item}`,
			permissionAll,
		];
		listPermissionCRUD[permissionDelete] = [
			`delete-master-${item}`,
			permissionAll,
		];
	});

	return listPermissionCRUD;
};

export const convertListToCRUDPermissionService = (listService: string[]) => {
	const listPermissionCRUD = {};

	listService.forEach(item => {
		const itemTitleCase = item
			.replace(/(-\w)/g, m => m[1].toUpperCase())
			.replace(/^\w/, c => c.toUpperCase());
		const permissionApprove = `permissionApproveService${itemTitleCase}`;
		const permissionReject = `permissionRejectService${itemTitleCase}`;
		const permissionRead = `permissionReadService${itemTitleCase}`;
		const permissionCreate = `permissionCreateService${itemTitleCase}`;
		const permissionUpdate = `permissionUpdateService${itemTitleCase}`;
		const permissionDelete = `permissionDeleteService${itemTitleCase}`;
		const permissionAll = `all-transaksi-${item}`;

		listPermissionCRUD[permissionApprove] = [
			`approval-${item}`,
			`approval-all`,
		];
		listPermissionCRUD[permissionReject] = [`reject-${item}`, `reject-all`];
		listPermissionCRUD[permissionRead] = [
			`read-transaksi-${item}`,
			permissionAll,
		];
		listPermissionCRUD[permissionCreate] = [
			`create-transaksi-${item}`,
			permissionAll,
		];
		listPermissionCRUD[permissionUpdate] = [
			`update-transaksi-${item}`,
			permissionAll,
		];
		listPermissionCRUD[permissionDelete] = [
			`delete-transaksi-${item}`,
			permissionAll,
		];
	});

	return listPermissionCRUD;
};

export const generateCheckPermissions = (
	permissionToken: string[],
	listPermissions: Object,
) => {
	const listCheckPermission = {};

	for (const key in listPermissions) {
		const name = `isAllow${key.replace("permission", "")}`;
		listCheckPermission[name] =
			intersection(permissionToken, listPermissions[key]).length > 0;
	}

	return listCheckPermission;
};
