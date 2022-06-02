import api from "./dox";

// export const getFileDatabase = async => {
//     return api
//         .get('/downloads/document-customer/excel')
//         .then(res => {
//             return res.data;
//         })
//         .catch(error => {
//             return error;
//         })
// };

// export const getFileDatabase = () => {
//     const token = localStorage.getItem("Token");
// 	return api({
// 		method: "GET",
// 		url: "http://103.93.57.36:8008/uploads//app/tmp/download/excel/documents-20220519115243.xlsx?signature=eyJtZXNzYWdlIjoiL3VwbG9hZHMvL2FwcC90bXAvZG93bmxvYWQvZXhjZWwvZG9jdW1lbnRzLTIwMjIwNTE5MTE1MjQzLnhsc3giLCJleHBpcnlEYXRlIjoiMjAyMi0wNS0xOVQxMTo1ODozMS42NjVaIn0.SXob2mHyzhCxI2RNppZPiON9-DsTT4_lov_ep6k_Aa4",
// 		responseType: "blob",
// 		headers: { Authorization: `Bearer ${token}` },
//      headers: { "Content-Type": "multipart/form-data" },
// 	});
// };

export const getFileDatabase = () => {
	return api({
		method: "GET",
		url: "/downloads/document-customer/excel",
		// responseType: "blob",
		// headers: { "Content-Type": "multipart/form-data"}
	}).then(res => {
		window.location.replace(`http://103.93.57.36:8008${res.data}`);
	});
};
