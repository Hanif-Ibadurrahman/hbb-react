import React from "react";
import { ThemeProvider as OriginalThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { useThemeSlice } from "./slice";
import { selectTheme } from "./slice/selectors";

export const ThemeProvider = (props: { children: React.ReactNode }) => {
	useThemeSlice();

	const theme = useSelector(selectTheme);
	return (
		<OriginalThemeProvider theme={theme}>
			{props.children}
		</OriginalThemeProvider>
	);
};
