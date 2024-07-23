import {ReactElement, ComponentProps, FC} from "react";
import Link from "next/link";
import {IconProps} from "@mui/material";

export * from './Header';
export * from './HeaderItem';
export * from "./BurgerMenu"
export * from "./ImageIcon"
export * from "./DesktopMenu"

export type MenuProps = Omit<HeaderMenuProps, "setAnchor" | "anchorEl"> | HeaderLinkItem;

export interface HeaderMenuProps {
	icon: ReactElement<IconProps>,
	value: string,
	anchorEl: HTMLElement | null,
	setAnchor: (x: HTMLElement | null) => void,
	menuItems: HeaderLinkItem[]
}

export type HeaderLinkItem = {
	icon: ReactElement<IconProps>
	value: string
	type?: "icon" | "text"
} & ComponentProps<typeof Link>
