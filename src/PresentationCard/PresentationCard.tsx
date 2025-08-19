import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Chip, Link, Stack, SxProps } from "@mui/material";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Presentation } from "src/types";

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
      h1: ({ children }) => <Typography variant={"h5"}>{children}</Typography>,
      h2: ({ children }) => <Typography variant={"h5"}>{children}</Typography>,
      h3: ({ children }) => <Typography variant={"h5"}>{children}</Typography>,
      h4: ({ children }) => <Typography variant={"h5"}>{children}</Typography>,
      h5: ({ children }) => <Typography variant={"h5"}>{children}</Typography>,
      h6: ({ children }) => <Typography variant={"h5"}>{children}</Typography>,
      p: ({ children }) => <Typography variant={"body2"}>{children}</Typography>,
      a: ({ children, href }) => <a style={{ color: "#0885ff" }} href={href}>{children}</a>,
      img: ({ src, alt }) => <img style={{ maxWidth: "100%", height: "auto" }} src={src} alt={alt} />,
    }}
  >
    {children}
  </Markdown>
);

export interface PresentationCardProps {
  presentation: Presentation;
  maxDescriptionHeight?: string | number;
  href: string;
  cardSx?: SxProps;
}

const PresentationCard = ({
  presentation: {
    title,
    presenter,
    event,
    date,
    content,
    tags = [],
    thumbnail,
  },
  maxDescriptionHeight,
  href,
  cardSx,
}: PresentationCardProps) => {
  const [showGradient, setShowGradient] = useState(maxDescriptionHeight ? true : false);
  const descRef = useRef<HTMLDivElement>(null);

  const formattedDate = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  function updateGradientVisibility() {
    if (descRef.current && maxDescriptionHeight) {
      const { scrollHeight, clientHeight } = descRef.current;
      setShowGradient(scrollHeight > clientHeight);
    }
  }

  useEffect(updateGradientVisibility, [content, maxDescriptionHeight]);
  useLayoutEffect(() => {
    // called on component mount, adds event listener for resize
    // ensure we only run this effect if maxDescriptionHeight is defined
    if (!maxDescriptionHeight) return;

    window.addEventListener("resize", updateGradientVisibility);
    return () => window.removeEventListener("resize", updateGradientVisibility);
  }, [maxDescriptionHeight]);

  const thumbnailSrc = "src" in thumbnail ? thumbnail.src : `https://img.youtube.com/vi/${thumbnail.youtubeId}/hqdefault.jpg`;
  const thumbnailAlt = "alt" in thumbnail ? (thumbnail.alt ?? title) : title;

  return (
    <Card sx={cardSx ?? {maxWidth: 400}}>
      <Link href={href} underline="none" color="inherit">
        <CardMedia
          component="img"
          height="200"
          image={thumbnailSrc}
          alt={thumbnailAlt}
          sx={{ objectFit: "cover" }}
        />
      </Link>
      <CardContent>
        <Link href={href} underline="none" color="inherit">
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Link>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {event ? `${presenter} at ${event}` : presenter}
        </Typography>
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
        <div
          ref={descRef}
          style={(showGradient && maxDescriptionHeight) ? {
            maxHeight: maxDescriptionHeight,
            overflow: "hidden",
            position: "relative",
            userSelect: showGradient ? "none" : "auto",
            cursor: showGradient ? "pointer" : "default",
          } : { position: "relative" }}
          onClick={() => setShowGradient(false)}
        >
          <CustomMarkdown>
            {content}
          </CustomMarkdown>
          {showGradient && (
            <div
              className="gradient-overlay"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "2.2em",
                pointerEvents: "none",
                background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.95) 80%)",
                display: showGradient ? "block" : "none",
              }}
            />
          )}
        </div>
        <Typography variant="caption" color="text.secondary" display="block">
          {formattedDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PresentationCard;
