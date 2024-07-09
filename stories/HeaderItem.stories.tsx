import type { Meta, StoryObj } from '@storybook/react';
import { QuestionMark, Terminal, CalendarMonth, FileDownload, Description } from '@mui/icons-material';

import { HeaderItem } from '../components/layout/Header/HeaderItem';
import {fn} from "@storybook/test";

const meta = {
  title: 'Layout/HeaderItem',
  component: HeaderItem,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs', ],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: { onClick: fn() }
} satisfies Meta<typeof HeaderItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextLink: Story = {
  args: {
    value: "Test",
    href: "https://osg-htc.org",
    icon: <QuestionMark />,
    type: "text"
  }
};

export const IconLink: Story = {
  args: {
    value: "Test",
    href: "https://osg-htc.org",
    icon: <QuestionMark />,
    type: "icon"
  }
};

export const OpenMenu: Story = {
  args: {
    open: true,
    value: "Software",
    icon: <Terminal />,
    menuItems: [
      {
        value: "Release Plan",
        href: "/release-plan",
        icon: <CalendarMonth />
      },
      {
        value: "Releases",
        href: "/releases",
        icon: <FileDownload />
      },
      {
        value: "Documentation",
        href: "https://docs.pelicanplatform.org/",
        target: "_blank",
        icon: <Description />
      }
    ]
  }
}

export const ClosedMenu: Story = {
  args: {
    open: false,
    value: "Software",
    icon: <Terminal />,
    menuItems: [
      {
        value: "Release Plan",
        href: "/release-plan",
        icon: <CalendarMonth />
      },
      {
        value: "Releases",
        href: "/releases",
        icon: <FileDownload />
      },
      {
        value: "Documentation",
        href: "https://docs.pelicanplatform.org/",
        target: "_blank",
        icon: <Description />
      }
    ]
  }
}
