import React, { useEffect, useState, useRef } from "react";
// import "./qrcode.scoped.scss";
import QRCode from "react-qr-code";

export default function QR(props) {
	const [width, setWidth] = useState(0);
	const ref: any = useRef(null);

	useEffect(() => {
		setWidth(ref.current.clientWidth);
	});

	return (
		<div className={props.className} style={{ width: "100%" }} ref={ref}>
			<QRCode
				id={props.id}
				title={props.title}
				value={props.value}
				size={width}
			/>
		</div>
	);
}
