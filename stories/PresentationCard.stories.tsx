import type { Meta, StoryObj } from '@storybook/react';

import { PresentationCard } from '../src';
import defaultPresentation from './mockData/Presentation';

const meta: Meta<typeof PresentationCard> = {
  title: "Components/Presentation/PresentationCard",
  component: (args) => {
    return <PresentationCard {...args} />;
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    presentation: defaultPresentation,
    href: "#",
  }
};

export const LargeWithMaxHeight: Story = {
  args: {
    ...Default.args,
    maxDescriptionHeight: "4.5em",
  }
};

export const SmallWithMaxHeight: Story = {
  args: {
    presentation: {
      ...defaultPresentation,
      content: "This is a short description.",
    },
    href: "#",
  }
};

export const WithCustomThumbnail: Story = {
  args: {
    presentation: {
      ...defaultPresentation,
      thumbnail: {
        src: "https://placehold.co/1280x720",
        alt: "Custom Thumbnail",
      },
    },
    href: "#",
    maxDescriptionHeight: "4.5em",
  }
};
