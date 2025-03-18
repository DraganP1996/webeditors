import { EditorView } from 'codemirror';
import { Compartment } from '@codemirror/state';

import { ThemeNames } from '../components';
import { THEMES } from '../styles/themes';

export const setTheme = (editorView: EditorView, theme: ThemeNames, currentTheme: Compartment) => {
  editorView.dispatch({
    effects: currentTheme.reconfigure(THEMES[theme]),
  });
};
