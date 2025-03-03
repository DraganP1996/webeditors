import { THEMES } from './themes';

type LIST_OF_THEMES = keyof typeof THEMES;

export type ThemeNames = Exclude<LIST_OF_THEMES, 'createTheme'>;
