import type { Preview } from "@storybook/react";// .storybook/preview.js
import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { pelicanTheme } from '../src/themes';

const preview: Preview = {
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        pelican: pelicanTheme
      },
      defaultTheme: 'light',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
  ],
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
