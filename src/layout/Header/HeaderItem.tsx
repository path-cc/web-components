import React, {useRef, useEffect, useState} from "react";
import Link from "next/link";
import {Box, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";

import type {HeaderLinkItem, HeaderMenuProps, MenuProps} from "./index";

export const HeaderItem = ({...props}: HeaderMenuProps | HeaderLinkItem) => {
	if("menuItems" in props) {
		return <HeaderMenu {...props} />
	} else if(props.type == "text") {
		return <HeaderLink {...props} />
	} else {
		return <HeaderIconLink {...props} />
	}
}

const HeaderMenu = ({icon, value, open, setAnchor, menuItems}: HeaderMenuProps) => {

	const anchorRef = useRef<HTMLElement>(null)

	// Effect to perform actions when ref changes
	const [refChange, setRefChange] = useState<number>(0); // State to track ref changes
	useEffect(() => {
		setRefChange(refChange + 1);
	}, [anchorRef.current]); // Dependency on refChange state to trigger effect

	return (
			<>
				<Box style={{display: "flex"}}
							ref={anchorRef}
							aria-controls={open ? `${value}-menu` : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={e => setAnchor(anchorRef.current)}
				>
					<Typography id={`${value}-header`} display={"flex"} my={"auto"} pl={2} lineHeight={1} variant={"h6"}>
						<Box display={"inline"} my={"auto"}>
							{value}
						</Box>
						{open ?
								<ArrowDropUp /> :
								<ArrowDropDown />
						}
					</Typography>
				</Box>
				<Menu
						anchorEl={anchorRef.current}
						open={open}
						onClose={() => setAnchor(null)}
						sx={{mt: 2}}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
				>
					{menuItems.map((item) => (
							<Link key={item.value} {...item} style={{textDecoration: "none", ...item.style}}>
								<MenuItem onClick={e => setAnchor(anchorRef.current)}>{item.value}</MenuItem>
							</Link>
					))}
				</Menu>
			</>
	)
}

const HeaderLink = ({...props} : HeaderLinkItem) => {
	return (
			<Link {...props} style={{display: "flex", textDecoration: "none", ...props.style}} >
				<Typography my={"auto"} pl={2} lineHeight={1} variant={"h6"}>
					{props.value}
				</Typography>
			</Link>
	)
}

const HeaderIconLink = ({...props} : HeaderLinkItem) => {
	return (
			<Link href={props.href} target={props.target}>
				<Tooltip title={props.value}>
					<Box
							sx={{
								":hover": {
									transform: "scale(1.15)",
									transition: "transform 0.3s",
								},
								marginTop: "2px"
							}}
					>
						{
							React.cloneElement(props.icon, {
								fontSize: "large",
								sx:{
									":hover": {
										transform: "scale(1.15)",
										transition: "transform 0.3s",
									},
									marginTop: "2px"
								}
							})
						}
					</Box>
				</Tooltip>
			</Link>
	)
}
