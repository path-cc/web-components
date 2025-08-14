import {Box, Typography} from "@mui/material";

const FooterSection = ({header, children}: {header: string, children: React.ReactNode}) => {
	return (
		<>
			<Typography variant="h6" color="inherit" component="div">{header}</Typography>
			<Box display={'flex'} flexDirection={'column'} gap={0.5} mt={1}>
				{children}
			</Box>
		</>
	)
}

export default FooterSection;
