import Grid from "@mui/material/Grid";
import SocialLink, {SocialType} from "./SocialLink";
import MenuLink from "./MenuLink";
import FooterSection from "./FooterSection";

export interface ContactCardProps {
	email?: string;
	phone?: string;
	social?: Partial<Record<SocialType, string>>
}

const ContactCard = ({email, phone, social }: ContactCardProps) => {
	return (
		<FooterSection header="Contact Us">
			{email && <MenuLink href={`mailto:${email}`}>{email}</MenuLink>}
			{phone && <MenuLink href={`tel:${phone}`}>{phone}</MenuLink>}
			<Grid container>
				{social && Object.entries(social).filter(([,url]) => url !== undefined).map(([type, url]) => (
					<Grid key={type}>
						<SocialLink type={type as SocialType} url={url} key={type}/>
					</Grid>
				))}
			</Grid>
		</FooterSection>
	)
}

export default ContactCard;
