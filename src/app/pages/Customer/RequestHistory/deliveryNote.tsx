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
import moment from "moment";

// Create styles
const styles = StyleSheet.create({
	page: {
		color: "black",
	},
	section: {
		margin: 20,
		padding: 20,
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
	row: {
		flexDirection: "row",
		alignItems: "center",
		fontSize: 12,
		paddingTop: 5,
		paddingBottom: 5,
	},
	space: {
		marginTop: 32,
	},
	vehicleTitle: {
		width: "30%",
	},
	separator: {
		width: "5%",
	},
	vehicleDetail: {
		width: "65%",
	},
	ttd: {
		marginTop: 100,
		width: "100%",
		flexDirection: "column",
		alignItems: "flex-end",
		justifyContent: "flex-end",
		fontSize: 12,
	},
	ttdDate: {
		textAlign: "center",
		width: 150,
		marginBottom: 5,
	},
	ttdText: {
		textAlign: "center",
		width: 150,
		marginBottom: 5,
	},
	ttdName: {
		textAlign: "center",
		width: 150,
		marginTop: 75,
	},
});

// Create Document Component
const DeliveryNote = ({ match }) => {
	const requestBox: RequestBoxInterfaceState = useSelector(selectRequestBox);
	const companyName = requestBox?.customer?.company?.name;
	const address = requestBox?.customer?.company?.address;
	const typeRequest = requestBox?.type;
	const driver = requestBox?.transporter?.name;
	const brand = requestBox?.car?.brand;
	const licensePlate = requestBox?.car?.license_plate;
	const date = moment(requestBox.delivery_date).format("DD MMMM YYYY");
	let dateNow = moment().format("DD MMMM YYYY");
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
						<Text style={styles.content}>
							Bersama ini disampaikan bahwa barang-barang yang tersebut dibawah
							ini akan dipindahkan/dibawa dari Kantor PT Perusahaan Gas Negara
							Tbk. Klender dengan alamat Jalan Swadaya Pln No.5 Jatinegara
							Kecamatan Cakung Kota Jakarta Timur Daerah Khusus Ibukota Jakarta
							13930 ke Kantor {companyName} dengan alamat{" "}
							{address ? address : "-"}
						</Text>
						<Table data={data} />
						<Text style={styles.space} />
						<Text style={styles.content}>
							Barang-barang tersebut akan dibawa dengan menggunakan :
						</Text>
						<View style={styles.row}>
							<Text style={styles.vehicleTitle}>Jenis Kendaraan</Text>
							<Text style={styles.separator}>{":"}</Text>
							<Text style={styles.vehicleDetail}>{brand ? brand : "-"}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.vehicleTitle}>Nomor Polosi</Text>
							<Text style={styles.separator}>{":"}</Text>
							<Text style={styles.vehicleDetail}>
								{licensePlate ? licensePlate : "-"}
							</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.vehicleTitle}>Pengemudi</Text>
							<Text style={styles.separator}>{":"}</Text>
							<Text style={styles.vehicleDetail}>{driver ? driver : "-"}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.vehicleTitle}>Tanggal Berangkat</Text>
							<Text style={styles.separator}>{":"}</Text>
							<Text style={styles.vehicleDetail}>{date ? date : "-"}</Text>
						</View>
						<View style={styles.ttd}>
							<Text style={styles.ttdDate}>Jakarta, {dateNow}</Text>
							<Text style={styles.ttdText}>Unit Head Archive &</Text>
							<Text style={styles.ttdText}>Facility Support Services</Text>
							<Text style={styles.ttdName}>Arie Kusmadi</Text>
						</View>
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
