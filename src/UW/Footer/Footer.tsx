'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Logo from '../Logo'
import ContactCard, {ContactCardProps} from './ContactCard';
import {useTheme} from "@mui/material";
import FooterMenu, {FooterMenuProps} from "./FooterMenu";

export interface FooterProps {
	menu: FooterMenuProps[];
	contact: ContactCardProps;
	accessibilityEmail: string;
}

const Footer = ({menu, contact, accessibilityEmail} : FooterProps) => {

	const theme = useTheme()

	return (
		<Box
			width={"100%"}
		>
			<Box
				sx={{
					width: '100%',
					backgroundColor: 'primary.main',
					color: 'primary.contrastText',
					height: '.5rem'
				}}
			>
			</Box>
			<Box
					sx={{
						width: '100%',
						backgroundColor: 'secondary.light',
						color: 'secondary.contrastText',
						py: 4
					}}
			>
				<Container>
					<Grid container spacing={2} justifyContent={"space-evenly"}>
						<Grid>
							<Box display={"flex"} alignItems={"center"}>
								<Logo height={100} fill={theme.palette.secondary.contrastText} />
							</Box>
						</Grid>
						{
							menu.map((menuProps, i) => (
								<Grid key={i}>
									<FooterMenu {...menuProps} />
								</Grid>
							))
						}
						<Grid>
							<ContactCard {...contact}/>
						</Grid>
					</Grid>
					<Box my={2}>
						<Box textAlign={"center"}>
							<Typography variant="subtitle1">
								<Box component={"span"} mr={1}>
									Website feedback, questions or accessibility issues:
								</Box>
								<Link color={"secondary.contrastText"} href={`mailto:${accessibilityEmail}`}>{accessibilityEmail}</Link>
							</Typography>
						</Box>
						<Box textAlign={"center"}>
							<Typography variant="subtitle1">
								<Link color={"secondary.contrastText"} href={"https://www.wisc.edu/privacy-notice/"}>Privacy Notice</Link>
								<Box component={"span"} mx={1}>
									| © {(new Date()).getFullYear()} The Board of Regents of the
								</Box>
								<Link color={"secondary.contrastText"} href={"https://www.wisconsin.edu/"}>University of Wisconsin System</Link>
							</Typography>
						</Box>
					</Box>
				</Container>
			</Box>
		</Box>
	)
}

export default Footer;
