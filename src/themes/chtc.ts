'use client'

import {createTheme, responsiveFontSizes} from "@mui/material";
import {Red_Hat_Display, Red_Hat_Text} from "next/font/google";

const rhd = Red_Hat_Display({
	subsets: ['latin'], style: ['normal'], weight: ['300', '400', '700'], display: 'swap'
})
const rht = Red_Hat_Text({
	subsets: ['latin'], style: ['normal', 'italic'], weight: ['300', '400', '600'], display: 'swap'
})

let theme = createTheme({
	palette: {
		primary: {
			main: "#B61F24"
		},
		secondary: {
			main: "#000000"
		}
	},
	typography: {
		h1: {
			fontFamily: rhd.style.fontFamily,
			fontWeight: 700,
		},
		h2: {
			fontFamily: rhd.style.fontFamily,
			fontWeight: 700,
		},
		h3: {
			fontFamily: rhd.style.fontFamily,
			fontWeight: 700,
		},
		h4: {
			fontFamily: rhd.style.fontFamily,
			fontWeight: 700,
		},
		h5: {
			fontFamily: rhd.style.fontFamily,
			fontWeight: 700,
		},
		h6: {
			fontFamily: rhd.style.fontFamily,
			fontWeight: 700,
		},
		body1: {
			fontSize: "1.2rem",
			paddingBottom: "1rem",
		},
		fontFamily: [
			rht.style.fontFamily,
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
