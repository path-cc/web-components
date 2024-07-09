'use client'

import React, {useState, useEffect} from "react";
import {Box, Typography} from "@mui/material"
import Link, {LinkProps} from "next/link";
import {
	Home,
	Groups,
	Help,
	Email,
	Grade,
	Newspaper,
	Terminal,
	CalendarMonth,
	FileDownload,
	Description,
	AlternateEmail
} from "@mui/icons-material";
import GitHubIcon from '@mui/icons-material/GitHub';


import {HeaderLinkItem, HeaderMenuProps} from "./index";
import {BurgerMenu, DesktopMenu, ImageIcon} from "./index";


export const Header = () => {

	// Scroll watcher for opacity
	let [scrolledTop, setScrolledTop] = useState(true);
	useEffect(() => {
		setScrolledTop(window.scrollY < 50);
		addEventListener("scroll", (event) => {
			setScrolledTop(window.scrollY < 50);
		});
	}, [])

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	return (
		
		<Box className={`${styles.header} ${scrolledTop ? styles.headerScrolled : ""}`} style={{
			display: "flex",
			justifyContent: "space-between",
			padding: "1rem",
			position: "fixed",
			zIndex: "1",
			width: "100%",
			overflow: "hidden"
		}}>
			<Box display={"flex"} flexGrow={1}>
				<Link href={"/"}>
					<Box style={{display: "flex"}}>
						<img src={PelicanLogo} alt={"Pelican Logo"} height={36}/>
						<Typography variant={"h5"} pl={1} my={"auto"}>Pelican Platform</Typography>
					</Box>
				</Link>
				<Box sx={{display: {xs: "flex", "md": "none"}}} flexGrow={1}>
					<BurgerMenu menuItems={MENU_ITEMS}/>
				</Box>
				<Box sx={{display: {xs: "none", "md": "flex"}}} flexGrow={1}>
					<DesktopMenu menuItems={MENU_ITEMS}/>
				</Box>
			</Box>
		</Box>
	)
}

