import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import TableRow from "./TableRow";

const styles = StyleSheet.create({
	tableContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 20,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		fontSize: 12,
		borderTop: "2px solid #EEE",
		paddingTop: 8,
		paddingBottom: 8,
		fontWeight: 800,
	},
	no: {
		width: "5%",
	},
	name: {
		width: "40%",
	},
	amount: {
		width: "25%",
	},
	desc: {
		width: "30%",
	},
});

const ItemsTable = ({ data }) => (
	<View style={styles.tableContainer}>
		{/*<TableHeader />*/}
		<View style={styles.row}>
			<Text style={styles.no}>No</Text>
			<Text style={styles.name}>Nama Barang</Text>
			<Text style={styles.amount}>Jumlah Barang</Text>
			<Text style={styles.desc}>Keterangan</Text>
		</View>
		<TableRow items={data.items} />
		{/*<TableFooter items={data.items} />*/}
	</View>
);

export default ItemsTable;
