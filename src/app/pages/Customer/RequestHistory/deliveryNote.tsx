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
import { RequestBoxInterfaceState } from "store/Types/RequestBoxTypes";
import { selectRequestBox } from "store/Selector/RequestBoxSelector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRequestBoxDetail } from "actions/RequestBoxAction";

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
		width: window.innerWidth,
		height: window.innerHeight,
	},
});

// Create Document Component
const DeliveryNote = ({ match }) => {
	const requestBox: RequestBoxInterfaceState = useSelector(selectRequestBox);
	const companyName = requestBox?.customer?.company?.name;
	const address = requestBox?.customer?.company?.address;
	const typeRequest = requestBox?.type;

	const request_id = match.params.id;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRequestBoxDetail(request_id));
	}, []);

	const data = {
		id: requestBox?.id,
		items: [
			{
				id: 1,
				name: "Box",
				amount: requestBox?.request_items?.length,
				desc: requestBox?.note,
			},
		],
	};
	return (
		<PDFViewer style={styles.viewer}>
			{/* Start of the document*/}
			<Document title="Surat-Jalan">
				<Page size="A4" style={styles.page}>
					<View style={styles.section}>
						<Text style={styles.title}>Surat Jalan</Text>
						{typeRequest === "request-box" && (
							<Text style={styles.content}>
								Bersama ini disampaikan bahwa barang-barang yang tersebut
								dibawah ini akan dipindahkan/dibawa dari Kantor PT Perusahaan
								Gas Negara Tbk. Klender dengan alamat Jalan Swadaya Pln No.5
								Jatinegara Kecamatan Cakung Kota Jakarta Timur Daerah Khusus
								Ibukota Jakarta 13930 ke Kantor {companyName} dengan alamat{" "}
								{address}
							</Text>
						)}
						{typeRequest === "borrow-box" && (
							<Text style={styles.content}>
								Bersama ini disampaikan bahwa barang-barang yang tersebut
								dibawah ini akan dipindahkan/dibawa dari Kantor PT Perusahaan
								Gas Negara Tbk. Klender dengan alamat Jalan Swadaya Pln No.5
								Jatinegara Kecamatan Cakung Kota Jakarta Timur Daerah Khusus
								Ibukota Jakarta 13930 ke Kantor {companyName} dengan alamat{" "}
								{address ? address : "-"}
							</Text>
						)}
						<Table data={data} />
						{/* <Image
							style={{ width: 500, height: 500 }}
							src="https://image.shutterstock.com/image-photo/tiny-floating-house-on-lake-600w-1980476267.jpg"
						/> */}
					</View>
				</Page>
			</Document>
		</PDFViewer>
	);
};

export default DeliveryNote;
