import {Typography, Box, Container} from '@mui/material';
import Balancer from "react-wrap-balancer";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import {BackendArticle} from '../types'
import markdownComponents from "../markdownComponents";

const Article = ({article}: {article: BackendArticle}) => {
	return (
			<Container maxWidth={"md"}>
				<Box pt={6}>
					<Box textAlign={"center"} pb={2}>
						<Box pb={6}>
							<Typography variant={"h3"} ><Balancer>{article.title}</Balancer></Typography>
						</Box>
						<Box height={"1rem"} borderRadius={"10px"} bgcolor={"primary.main"}></Box>
						<Box pt={1} display={"flex"} justifyContent={"space-between"}>
							<Typography variant={"h5"}>{article.author}</Typography>
							<Typography variant={"h5"}>{article.date.toLocaleDateString()}</Typography>
						</Box>
					</Box>
					<Markdown
							rehypePlugins={[rehypeRaw]}
							components={markdownComponents}
					>
						{article.content}
					</Markdown>
				</Box>
			</Container>
	)
}

export default Article;
