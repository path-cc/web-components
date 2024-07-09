'use client'

import {useState, useEffect, ReactNode} from "react";
import {Box, Typography} from "@mui/material"
import styles from "../../../app/page.module.css"
import Link from "next/link";

import {MenuProps} from "./index.d";
import {BurgerMenu, DesktopMenu, ImageIcon} from "./index";

export interface HeaderProps {
	icon: ReactNode,
	title: string,
	menuItems: MenuProps[]
}

export const Header = ({icon, title, menuItems}: HeaderProps) => {

	// Scroll watcher for opacity
	let [scrolledTop, setScrolledTop] = useState(true);
	useEffect(() => {
		setScrolledTop(window.scrollY < 50);
		addEventListener("scroll", (event) => {
			setScrolledTop(window.scrollY < 50);
		});
	}, [])

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
							{icon}
							<Typography variant={"h5"} pl={1} my={"auto"}>{title}</Typography>
						</Box>
					</Link>
					<Box sx={{display: {xs: "flex", "md": "none"}}} flexGrow={1}>
						<BurgerMenu menuItems={menuItems}/>
					</Box>
					<Box sx={{display: {xs: "none", "md": "flex"}}} flexGrow={1}>
						<DesktopMenu menuItems={menuItems}/>
					</Box>
				</Box>
			</Box>
	)
}
