import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const Banner = ({children}) => {
	return (
			<Box
					sx={{
						width: '100%',
						backgroundColor: 'primary.main'
					}}
			>
				<Container>
					<Box
						display={"flex"}
						flexDirection={"row"}
						justifyContent={"space-between"}
						alignItems={"center"}
						paddingX={1}
					>
						<Box>
							<Link
									href={"https://www.wisc.edu/"}
									sx={{
										color: 'primary.contrastText',
									}}
							>
								University of Wisconsin–Madison
							</Link>
						</Box>
						<Box>
							{children}
						</Box>
					</Box>
				</Container>
			</Box>
	)
}

export default Banner;
