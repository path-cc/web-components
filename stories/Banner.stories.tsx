import React from 'react';
import Banner from '../src/layout/Header/Banner';

export default {
  title: 'Example/Banner',
  component: Banner,
  argTypes: {
    imageSrc: { control: 'text' },
    headerText: { control: 'text' },
    excerptText: { control: 'text' },
    imagePosition: { 
      control: { type: 'select' },
      options: ['float', 'left'],
    },
  },
};

const Template = (args) => <Banner {...args} />;

export const Pelican = Template.bind({});
Pelican.args = {
  imageSrc: 'https://via.placeholder.com/300',
  headerText: 'Banner Header',
  excerptText: 'This is an excerpt text for the banner component.',
  link: 'https://pelicanplatform.org',
  imagePosition: 'left',
};

export const OSG = Template.bind({});
OSG.args = {
  imageSrc: 'https://via.placeholder.com/300',
  headerText: 'Banner Header',
  excerptText: 'This is an excerpt text for the banner component.',
  link: 'https://osg-htc.org/',
  imagePosition: 'float',
};
