import MenuLink from "./MenuLink";
import FooterSection from "./FooterSection";

export interface FooterMenuItem {
	label: string;
	href: string;
}

export interface FooterMenuProps {
	label: string;
	items: FooterMenuItem[];
}

const FooterMenu = ({label, items}: FooterMenuProps) => {
	return (
		<FooterSection header={label}>
			{
				items.map((item, i) => (
					<MenuLink key={i} href={item.href}>
						{item.label}
					</MenuLink>
				))
			}
		</FooterSection>
	)
}

export default FooterMenu;
