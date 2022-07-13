import ReactPDF, {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	PDFViewer,
} from "@react-pdf/renderer";
import Table from "./TablePDF/Table";
import { Image } from "@react-pdf/renderer";
import { Document as DocumentView, Page as PageView, pdfjs } from "react-pdf";
import { useState } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// Create styles
const styles = StyleSheet.create({
	page: {
		color: "black",
	},
	section: {
		margin: 10,
		padding: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: 800,
		textAlign: "center",
		marginBottom: 20,
	},
	content: {
		fontSize: 12,
		lineHeight: 2,
	},
	viewer: {
		width: window.innerWidth, //the pdf viewer will take up all of the width and height
		height: window.innerHeight,
	},
});

const data = {
	id: "5df3180a09ea16dc4b95f910",
	items: [
		{
			id: 1,
			name: "Boks dan Folder Arsip",
			amount: "800",
			desc: "Kirim Ke Bandung",
		},
		{
			id: 2,
			name: "Boks dan Folder Arsip",
			amount: "800",
			desc: "Kirim Ke Bandung",
		},
	],
};

// Create Document Component
function BasicDocument() {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	return (
		<div>
			<DocumentView
				file="https://drive.google.com/file/d/1FT8mYtE-78xVkQ0PidnFUUsrpP-9uQqF/view"
				onLoadSuccess={onDocumentLoadSuccess}
			>
				<PageView pageNumber={pageNumber} />
			</DocumentView>
			<p>
				Page {pageNumber} of {numPages}
			</p>
		</div>
		// <PDFViewer style={styles.viewer} >
		// 	{/* Start of the document*/}
		// 	<Document title="Surat-Jalan">

		// 		{/*render a single page*/}
		// 		{/* <Page size="A4" style={styles.page}>
		// 			<View style={styles.section}>
		// 				<Text style={styles.title}>Surat Jalan</Text>
		// 				<Text style={styles.content}>
		// 					Bersama ini disampaikan bahwa barang-barang yang tersebut dibawah
		// 					ini akan dipindahkan/dibawa dari Kantor PT Perusahaan Gas Negara
		// 					Tbk. Klender dengan alamat Jalan Swadaya Pln No.5 Jatinegara
		// 					Kecamatan Cakung Kota Jakarta Timur Daerah Khusus Ibukota Jakarta
		// 					13930 ke Kantor PT Perusahaan Gas Negara Tbk Medan dengan alamat
		// 					Lorong XII No.18, Glugur Kota, Kec. Medan Bar., Kota Medan,
		// 					Sumatera Utara 20238 dan dari Medan ke Record Center Bandung
		// 					dengan alamat Jalan Serang No.7, Batununggal, Jawa Barat 40272.
		// 				</Text>
		// 				<Table data={data} />
		// 				<Image
		// 					style={{ width: 500, height: 500 }}
		// 					src="https://image.shutterstock.com/image-photo/tiny-floating-house-on-lake-600w-1980476267.jpg"
		// 				/>
		// 			</View>
		// 		</Page> */}
		// 	</Document>
		// </PDFViewer>
	);
}

const DeliveryNote = () => {
	return <BasicDocument />;
};

export default BasicDocument;
