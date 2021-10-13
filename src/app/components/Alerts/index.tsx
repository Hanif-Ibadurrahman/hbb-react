/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import "./alert.scoped.scss";
import { Alert as B_Alert } from "react-bootstrap";

export default function Alert(props) {
	// const [alert, setAlert] = useState(false);

	// const _hideAlert = () => {
	//   return setAlert(alert => (alert = false));
	// };

	return (
		<B_Alert
			className="pos-a max-w-50% bd-rs-2"
			variant={props.variant}
			show={props.show}
			onClose={props.onHide}
			style={props.style}
			dismissible
		>
			<h6 className="pr-4">{props.text}</h6>
		</B_Alert>
	);
}
