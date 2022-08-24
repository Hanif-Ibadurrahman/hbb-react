import api from "./dox";

export const getFileDatabase = () => {
	return api({
		method: "GET",
		url: "/downloads/document-customer/excel",
	}).then(res => {
		const response = res.data as string;
		window.location.replace(
			`${process.env.REACT_APP_API_URL}${response.slice(1)}`,
		);
	});
};

export const getTemplateUpload = () => {
	return api({
		method: "GET",
		url: "/downloads/document/template",
	}).then(res => {
		const response = res.data as string;
		window.location.replace(
			`${process.env.REACT_APP_API_URL}${response.slice(1)}`,
		);
	});
};

export const getDocumentFile = id => {
	return api({
		method: "GET",
		url: `/downloads/document/${id}/document-file`,
	}).then(async res => {
		const response = res.data as string;
		window.open(response, "_blank");
	});
};
