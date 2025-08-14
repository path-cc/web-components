import {Link} from "@mui/material";

const MenuLink = ({href, children}: {href: string, children: string}) => {
	return (
		<Link href={href} color={'inherit'} underline="hover">
			{children}
		</Link>
	)
}

export default MenuLink;

