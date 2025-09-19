import React, {useRef, useEffect, useState, useMemo, FC} from "react";
import Link, {LinkProps} from "next/link";
import {
	Box,
	Menu,
	MenuItem,
	Tooltip,
	Typography
} from "@mui/material";
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";

import type {HeaderLinkItem, HeaderMenuProps, MenuProps} from "./index";

export const HeaderItem: FC<HeaderMenuProps | HeaderLinkItem> = ({...props}) => {
	if("menuItems" in props) {
		props = props as HeaderMenuProps
		return <HeaderMenu {...props} />
	}

	props = props as HeaderLinkItem
	if((props as HeaderLinkItem).type == "text") {
		return <HeaderLink {...props} />
	} else {
		return <HeaderIconLink {...props} />
	}
}

const HeaderMenu: FC<HeaderMenuProps> = ({value, anchorEl, setAnchor, menuItems}) => {

	const anchorRef = useRef<HTMLElement | null>(null)

	// Effect to perform actions when ref changes
	const [refChange, setRefChange] = useState<number>(0); // State to track ref changes
	useEffect(() => {
		setRefChange(refChange + 1);
	}, [anchorRef.current]); // Dependency on refChange state to trigger effect

	const open = useMemo(() => anchorEl == anchorRef.current, [anchorEl, anchorRef.current])

	return (
			<>
				<Box style={{display: "flex"}}
							ref={anchorRef}
							aria-controls={open ? `${value}-menu` : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={() => setAnchor(anchorRef.current)}
				>
					<Typography id={`${value}-header`} display={"flex"} my={"auto"} pl={2} lineHeight={1} component={"h6"}>
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
					{menuItems.map(({value, style, href, target}) => (
							<Link key={value}  style={{textDecoration: "none", ...style}} href={href} target={target}>
								<MenuItem onClick={() => setAnchor(anchorRef.current)}>{value}</MenuItem>
							</Link>
					))}
				</Menu>
			</>
	)
}

const HeaderLink: FC<HeaderLinkItem> = ({value, href, target, style}) => {

	return (
			<Typography my={"auto"} pl={2} lineHeight={1} component={"h6"}>
				<Link style={{display: "flex", textDecoration: "none", ...style}} href={href} target={target}>
						{value}
				</Link>
			</Typography>
	)
}

const HeaderIconLink: FC<HeaderLinkItem> = ({...props}) => {
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
						<Box
							fontSize={"large"}
							sx={{
								":hover": {
									transform: "scale(1.15)",
									transition: "transform 0.3s",
								},
								marginTop: "2px"
							}}
						>
							{props.icon}
						</Box>
					</Box>
				</Tooltip>
			</Link>
	)
}

export {HeaderLink, HeaderIconLink}