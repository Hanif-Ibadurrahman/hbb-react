import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		fontSize: 12,
		borderTop: "2px solid #EEE",
		paddingTop: 8,
		paddingBottom: 8,
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

const TableRow = ({ items }) => {
	const rows = items.map((item, index) => (
		<View style={styles.row} key={item.id.toString()}>
			<Text style={styles.no}>{index + 1}</Text>
			<Text style={styles.name}>{item.name}</Text>
			<Text style={styles.amount}>{item.amount} Boks</Text>
			<Text style={styles.desc}>{item.desc}</Text>
		</View>
	));
	return <Fragment>{rows}</Fragment>;
};

export default TableRow;
