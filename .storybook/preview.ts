import type { Preview } from "@storybook/react";// .storybook/preview.js
import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { pelicanTheme, osgTheme } from '../src/themes';

const decorators = [
  withThemeFromJSXProvider({
    themes: {
      pelican: pelicanTheme,
      osg: osgTheme
    },
    defaultTheme: 'osg',
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  }),
]

const preview: Preview = {
  decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
