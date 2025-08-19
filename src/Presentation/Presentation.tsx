import { Box, Chip, Container, Link, Stack, Typography } from "@mui/material";
import Markdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import rehypeRaw from "rehype-raw";
import { Presentation as PresentationType } from "src/types";

function getStringHash(value: string): number {
  // Simple hash function to generate a number from the tag string
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
}

function getTagColor(tag: string): string {
  let hue = getStringHash(tag) % 360;
  if (hue >= 60 && hue <= 140) {
    hue = (hue + 80) % 360; // avoid ugly colors
  }

  return `hsl(${hue}, 70%, 40%)`;
}

const CustomMarkdown = ({ children }: { children?: string | null }) => (
  <Markdown
    rehypePlugins={[rehypeRaw]}
    components={{
      h1: ({ children }) => <Typography variant={"h3"}>{children}</Typography>,
      h2: ({ children }) => <Typography variant={"h4"}>{children}</Typography>,
      h3: ({ children }) => <Typography variant={"h5"}>{children}</Typography>,
      h4: ({ children }) => <Typography variant={"h5"}>{children}</Typography>,
      h5: ({ children }) => <Typography variant={"h5"}>{children}</Typography>,
      h6: ({ children }) => <Typography variant={"h5"}>{children}</Typography>,
      p: ({ children }) => <Typography variant={"body1"}>{children}</Typography>,
      a: ({ children, href }) => <a style={{ color: "#0885ff" }} href={href}>{children}</a>,
      img: ({ src, alt }) => <img style={{ maxWidth: "100%", height: "auto" }} src={src} alt={alt} />,
    }}
  >
    {children}
  </Markdown>
);

const Presentation = ({ title, presenter, event, date, content, youtubeId, tags = [], links = [] }: PresentationType) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return <Container maxWidth={"md"}>
    <Box pt={6}>
      <Box textAlign={"center"} pb={2}>
        <Box pb={6}>
          <Typography variant={"h3"} ><Balancer>{title}</Balancer></Typography>
        </Box>
        <Box height={"1rem"} borderRadius={"10px"} bgcolor={"primary.main"}></Box>
        <Box pt={1} display={"flex"} justifyContent={"space-between"}>
          <Typography variant={"h5"}>{presenter} {event && `at ${event}`}</Typography>
          <Typography variant={"h5"}>{formattedDate}</Typography>
        </Box>
      </Box>

      {youtubeId && (
        <Box display={"flex"} justifyContent={"center"} pb={2}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            style={{ width: "100%", height: "auto", maxWidth: "640px", aspectRatio: "16/9" }}
            allowFullScreen
          ></iframe>
        </Box>
      )}

      <CustomMarkdown>
        {content}
      </CustomMarkdown>

      <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: "wrap" }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              backgroundColor: getTagColor(tag),
              color: "#fff",
              borderRadius: "0.5rem",
              fontWeight: "bold"
            }}
          />
        ))}
      </Stack>
      
      {links.length !== 0 &&
        <>
          <Typography variant="h4" mt={4}>
            Associated Links
          </Typography>

          <Box component="ul" mt={0}>
            {links.map((link) => (
              <li key={link.name}>
                <Link href={link.value} target="_blank">
                  {link.name}
                </Link>
              </li>
            ))}
          </Box>
        </>
      }
    </Box>
  </Container>;
};

export default Presentation;
