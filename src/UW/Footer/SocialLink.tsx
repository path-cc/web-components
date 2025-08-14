import Link from "@mui/material/Link"
import IconButton from "@mui/material/IconButton";
import {Facebook, Twitter, Instagram, GitHub, LinkedIn, YouTube} from "@mui/icons-material";

const SocialLink = ({type, url}: SocialLinkProps) => {
	return (
		<Link href={url}>
			<IconButton sx={{color: 'secondary.contrastText'}} aria-label={type} >
				{typeToIconMap[type]}
			</IconButton>
		</Link>
	)
}

const typeToIconMap: Record<SocialType, JSX.Element> = {
	"facebook": <Facebook />,
	"x": <Twitter />,
	"instagram": <Instagram />,
	"linkedin": <LinkedIn />,
	"youtube": <YouTube />,
	"github": <GitHub />
}

export type SocialType = "facebook" | "x" | "instagram" | "linkedin" | "youtube" | "github";

export interface SocialLinkProps {
	type: SocialType;
	url: string;
}

export default SocialLink;
