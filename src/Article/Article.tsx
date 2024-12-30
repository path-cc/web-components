import {Typography, Box, Container} from '@mui/material';
import Balancer from "react-wrap-balancer";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import {BackendArticle} from '../types'

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
							components={{
								h1: ({children}) => <Typography variant={"h1"}>{children}</Typography>,
								h2: ({children}) => <Typography variant={"h1"}>{children}</Typography>,
								h3: ({children}) => <Typography variant={"h1"}>{children}</Typography>,
								h4: ({children}) => <Typography variant={"h1"}>{children}</Typography>,
								h5: ({children}) => <Typography variant={"h1"}>{children}</Typography>,
								h6: ({children}) => <Typography variant={"h1"}>{children}</Typography>,
								p: ({children}) => <Typography variant={"body1"}>{children}</Typography>,
								a: ({children, href}) => <a style={{color: "#0885ff"}} href={href}>{children}</a>,
								img: ({src, alt}) => <img style={{maxWidth: "100%", height: "auto"}} src={src} alt={alt} />,
							}}
					>
						{article.content}
					</Markdown>
				</Box>
			</Container>
	)
}

export default Article;
