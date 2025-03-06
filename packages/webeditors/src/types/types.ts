import { THEMES } from '../styles/themes';

type LIST_OF_THEMES = keyof typeof THEMES;

export type ThemeNames = Exclude<LIST_OF_THEMES, 'createTheme'>;

export type CursorPosition = {
  ln: number;
  col: number;
};

export type EditorFooterConfig = {
  backgroundColor: string;
  color: string;
};
