import api from "./dox";

export const getFileDatabase = () => {
	return api({
		method: "GET",
		url: "/downloads/document-customer/excel",
	}).then(res => {
		window.location.replace(`http://103.93.57.36:8008${res.data}`);
	});
};

export const getTemplateUpload = () => {
	return api({
		method: "GET",
		url: "/downloads/document/template",
	}).then(res => {
		window.location.replace(`http://103.93.57.36:8008${res.data}`);
	});
};

export const getDocumentFile = id => {
	return api({
		method: "GET",
		url: `/downloads/document/${id}/document-file`,
	}).then(async res => {
		console.log("res >>>", res);
		const test = () => {
			<embed
				src={`http://103.93.57.36:8008${res.data}`}
				type="application/pdf"
				height={800}
				width={500}
			/>;
		};
		// const buffer = await fetch(`http://103.93.57.36:8008${res.data}`);
		// const arrbuff = await buffer.arrayBuffer();
		// const blob = new Blob([arrbuff], {
		// 	type: "application/pdf",
		// });
		window.open(
			`http://103.93.57.36:8008${res.data}`,
			"_blank",
			"popup",
		) as Window;
		// const dataUrl = ("test");

		// const title = newWindow.document.createElement("title");
		// const iframe = newWindow.document.createElement("iframe");

		// newWindow.document.head.appendChild(title);

		// iframe.setAttribute("src", dataUrl);
		// iframe.setAttribute("width", "100%");
		// iframe.setAttribute("height", "100%");
		// iframe.setAttribute("type", "application/pdf");

		// newWindow.document.body.appendChild(iframe);
		// window.location.replace(`http://103.93.57.36:8008/uploads//app/tmp/attachment/document/6c0f1c9e-80a9-48b3-bb90-6a405fcbd376.pdf?signature=eyJtZXNzYWdlIjoiL3VwbG9hZHMvL2FwcC90bXAvYXR0YWNobWVudC9kb2N1bWVudC82YzBmMWM5ZS04MGE5LTQ4YjMtYmI5MC02YTQwNWZjYmQzNzYucGRmIiwiZXhwaXJ5RGF0ZSI6IjIwMjItMDctMDZUMTI6MDk6MTQuNDUyWiJ9.2FxDXkY3K9RD6wClofgLG-7w4L5pyb5u3o5cSdfxC8U`);
	});
};
