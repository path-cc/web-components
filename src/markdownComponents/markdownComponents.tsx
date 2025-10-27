import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import type { Components } from "react-markdown";

const markdownComponents: Components = {
  h1: ({ children, ...props }) => {
    return (
      <Typography component={"h1"} variant="h4" gutterBottom {...props}>
        {children}
      </Typography>
    );
  },
  h2: ({ children, ...props }) => {
    return (
      <Typography component={"h2"} variant="h5" gutterBottom {...props}>
        {children}
      </Typography>
    );
  },
  h3: ({ children, ...props }) => {
    return (
      <Typography component={"h3"} variant="h6" gutterBottom {...props}>
        {children}
      </Typography>
    );
  },
  h4: ({ children, ...props }) => {
    return (
      <Typography
        component={"h4"}
        variant="h6"
        fontWeight={400}
        borderBottom={"black solid 1px"}
        gutterBottom
        {...props}
      >
        {children}
      </Typography>
    );
  },
  h5: ({ children, ...props }) => {
    return (
      <Typography
        component={"h5"}
        variant="h6"
        fontWeight={300}
        gutterBottom
        {...props}
      >
        {children}
      </Typography>
    );
  },
  h6: ({ children, ...props }) => {
    return (
      <Typography
        component={"h6"}
        variant="h6"
        fontWeight={300}
        color={"primary.main"}
        gutterBottom
        {...props}
      >
        {children}
      </Typography>
    );
  },
  p: (props) => (
    <Typography variant="body1" component={"div"} gutterBottom {...props} />
  ), // use sx for spacing
  a: (props) => <MuiLink {...props} />,
  ul: (props) => <Box component="ul" sx={{ pl: 4, mb: 2 }} {...props} />,
  ol: (props) => <Box component="ol" sx={{ pl: 4, mb: 2 }} {...props} />,
  li: (props) => <Box component="li" sx={{ mb: 0.5 }} {...props} />,
  blockquote: (props) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: 4,
        borderColor: "grey.300",
        pl: 2,
        ml: 0,
        my: 2,
        color: "grey.700",
        fontStyle: "italic",
      }}
      {...props}
    />
  ),
  code: ({ children, ...props }) => {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/styles/github.min.css"
        />
        <Box
          component="code"
          sx={{
            bgcolor: "grey.100",
            py: 0.2,
            borderRadius: 1,
            fontFamily: "monospace",
            fontSize: "0.95em",
          }}
          {...props}
        >
          {children}
        </Box>
      </>
    );
  },
  pre: (props) => (
    <Box
      component="pre"
      sx={{
        bgcolor: "grey.100",
        p: 2,
        borderRadius: 2,
        overflow: "auto",
        mb: 2,
      }}
      {...props}
    />
  ),
  img: (props) => {
    return (
      <img
        {...props}
        style={{
          maxWidth: "100%",
          height: "auto",
          marginTop: 2,
          marginBottom: 2,
        }}
      />
    );
  },
};

export default markdownComponents;
