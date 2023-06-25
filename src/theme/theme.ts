import * as color from './color'
import * as font from './font';
export const theme = {
    ...color,
    ...font
  };

export type Theme = typeof theme;