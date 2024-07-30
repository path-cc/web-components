import React from 'react';
import Minicard from '../src/layout/Header/Minicard.tsx';

export default {
  title: 'Example/Minicard',
  component: Minicard,
};

const newsArticles = [
  { title: 'Writing in a longer title to see how things work!', href: 'https://osg-htc.org/', date: 'August 1st, 2024', author: 'Molly McCarthy'},
  { title: 'New Article', href: 'https://osg-htc.org/', date: 'August 1st, 2024', author: 'Molly McCarthy'},
  { title: 'New Article', href: 'https://osg-htc.org/', date: 'August 1st, 2024', author: 'Molly McCarthy' },
];

export const Default = () => <Minicard newsArticles={newsArticles} />;
