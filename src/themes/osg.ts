'use client'

import {createTheme, responsiveFontSizes} from "@mui/material";
import {Poppins} from "next/font/google";

const poppins = Poppins({
	subsets: ['latin'], style: ['normal'], weight: ['300', '400', '600'], display: 'swap'
})

let theme = createTheme({
	palette: {
		primary: {
			dark: "#542d00",
			main: "#f6a32a",
			light: "#122029"
		}
	},
	typography: {
		h1: {
			fontFamily: poppins.style.fontFamily
		},
		h2: {
			fontFamily: poppins.style.fontFamily
		},
		h3: {
			fontFamily: poppins.style.fontFamily
		},
		h4: {
			fontFamily: poppins.style.fontFamily
		},
		h5: {
			fontFamily: poppins.style.fontFamily
		},
		h6: {
			fontFamily: poppins.style.fontFamily
		},
		body1: {
			fontSize: "1.2rem",
			paddingBottom: "1rem",
		},
		fontFamily: [
			"Helvetica Neue",
			"Helvetica",
			"Arial",
			"Lucida Grande",
			"sans-serif"
		].join(",")
	},
	components: {
		MuiContainer: {
			defaultProps: {}
		},
	},
});

theme = responsiveFontSizes(theme, {factor: 3})

export { theme }
