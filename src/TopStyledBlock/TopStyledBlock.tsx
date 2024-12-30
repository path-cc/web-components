import {ReactNode} from "react";
import {Box} from "@mui/material";

export interface TopStyledBlockProps {
	children: ReactNode
	width?: string
	offset?: string
	height?: string
}

const TopStyledBlock: React.FC<TopStyledBlockProps> = ({children, width, offset, height}) => {

	width = width ? width : "5rem"
	height = height ? height : "1rem"
	offset = offset ? offset : "-2rem"

	return (
			<Box display={"flex"} flexDirection={"column"}>
				<Box height={0}>
					<Box bgcolor={"primary.main"} width={width} height={height} mt={offset} borderRadius={2}></Box>
				</Box>
				<Box>
					{children}
				</Box>
			</Box>
	)
}

export default TopStyledBlock;