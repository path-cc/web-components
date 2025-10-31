import type { Components } from "react-markdown";
import markdownComponents from "../markdownComponents";

const smallHeaderComponents: Components = {
  ...markdownComponents,
  h1: markdownComponents.h5,
  h2: markdownComponents.h5,
  h3: markdownComponents.h5,
  h4: markdownComponents.h5,
  h5: markdownComponents.h5,
  h6: markdownComponents.h5,
};

export default smallHeaderComponents;
