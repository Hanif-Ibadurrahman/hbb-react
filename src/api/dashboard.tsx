import { apiWithToken } from ".";

export const getAllItemApi = () => {
	return apiWithToken.get(`/api/dashboard/total-inventory`);
};

export const getTotalInventoryApi = () => {
	return apiWithToken.get(`/api/dashboard/total-inventaris`);
};

export const getTotalHbbApi = () => {
	return apiWithToken.get(`/api/dashboard/total-hbb`);
};

export const getTotalInventoryValueApi = () => {
	return apiWithToken.get(`/api/dashboard/total-nilai-inventaris`);
};

export const getTotalHbbValueApi = () => {
	return apiWithToken.get(`/api/dashboard/total-nilai-hbb`);
};

export const getTotalTaskApi = () => {
	return apiWithToken.get(`/api/dashboard/task`);
};

export const getNotificationApi = () => {
	return apiWithToken.get(`/api/dashboard/notification`);
};

export const deleteNotificationApi = (id: number) => {
	return apiWithToken.delete(`/api/dashboard/notification/${id}`);
};

export const getTotalItemPerMonthApi = () => {
	return apiWithToken.get(`/api/dashboard/chart-jumlah-barang-perbulan`);
};

export const getTotalValuePerMonthApi = () => {
	return apiWithToken.get(`/api/dashboard/chart-total-nilai-hbb-inventaris`);
};

export const getTaskListApi = () => {
	return apiWithToken.get(`/api/dashboard/task-list`);
};
