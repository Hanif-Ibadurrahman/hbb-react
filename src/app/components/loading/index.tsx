import Load from "assets/preloaders/load.gif";

export const Loading = () => {
	return (
		<div
			style={{
				position: "fixed",
				width: "100%",
				height: "100vh",
				zIndex: 999999,
				overflow: "visible",
				background: `#ffffff url(${Load}) no-repeat center center`,
			}}
		/>
	);
};
