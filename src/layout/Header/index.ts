import {ReactNode} from "react";
import {LinkProps} from "next/link";

export * from './Header';
export * from './HeaderItem';
export * from "./BurgerMenu"
export * from "./ImageIcon"
export * from "./DesktopMenu"

export type MenuProps = Omit<HeaderMenuProps, "setAnchor" | "anchorEl"> | HeaderLinkItem;

export interface HeaderMenuProps {
	icon: ReactNode
	value: string
	anchorEl: HTMLElement | null
	setAnchor: (x: HTMLElement | null) => void
	menuItems: HeaderLinkItem[]
}

export interface HeaderLinkItem extends LinkProps {
	icon: ReactNode
	value: string
	target?: "_self" | "_blank"
	type?: "icon" | "text"
}
