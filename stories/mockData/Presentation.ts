import { Presentation } from "../../src/types";

const markdownContent = `
Computational notebooks have become a critical tool of scientific discovery,
by wrapping together code, results, and visualization into a common package. However,
moving complex notebooks between different facilities is not so easy: complex workflows
require precise software stacks, access to large data, and large backend computational
resources. The Floability project aims to connect these two worlds, making it possible
to specify, share, and execute computational workflows through the familiar notebook
interface. This talk will introduce the Floability concept of a workflow "backpack"
and demonstrate applications in high energy physics, machine learning, and geosciences.

### Speaker Bio

Whatever markdown you'd [like to put here](https://example.com).

# Header one

## Header two

### Header three

More content
`

const defaultPresentation: Presentation = {
  title: "Wrangling Complex Notebook Workflows with Floability",
  presenter: "Douglas Thain",
  event: "HTC25",
  date: "2025-06-04",
  content: markdownContent,
  tags: ["Research Computing", "Workflow"],
  youtubeId: "3gubQ4-B2Kw",
  links: [{
    name: "Public slides",
    value: "https://agenda.hep.wisc.edu/event/2297/contributions/33770/",
  }]
};

export default defaultPresentation;
