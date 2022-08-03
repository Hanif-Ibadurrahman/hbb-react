import api from "./dox";

export const getFileDatabase = () => {
	return api({
		method: "GET",
		url: "/downloads/document-customer/excel",
	}).then(res => {
		window.location.replace(`${res.data}`);
	});
};

export const getTemplateUpload = () => {
	return api({
		method: "GET",
		url: "/downloads/document/template",
	}).then(res => {
		window.location.replace(`${res.data}`);
	});
};

export const getDocumentFile = id => {
	return api({
		method: "GET",
		url: `/downloads/document/${id}/document-file`,
	}).then(async res => {
		window.open(`${res.data}`, "_blank", "popup") as Window;
	});
};
