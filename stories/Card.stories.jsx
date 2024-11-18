import React from 'react';
import { Card } from '../src/layout/Header/Card.tsx';

export default {
  title: 'Example/Card',
  component: Card,
  argTypes: {
    imageSrc: { control: 'text' },
    headerText: { control: 'text' },
    excerptText: { control: 'text' },
    imagePosition: { 
      control: { type: 'select' },
      options: ['top', 'left'],
    },
  },
};

const Template = (args) => <Card {...args} />;

export const ImageOnTop = Template.bind({});
ImageOnTop.args = {
  imageSrc: 'https://via.placeholder.com/300',
  headerText: 'Card Header',
  excerptText: 'This is an excerpt text for the card component.',
  imagePosition: 'top',
};

export const ImageOnLeft = Template.bind({});
ImageOnLeft.args = {
  imageSrc: 'https://via.placeholder.com/300',
  headerText: 'Card Header',
  excerptText: 'This is an excerpt text for the card component.',
  imagePosition: 'left',
};
