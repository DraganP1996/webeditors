import { EditorState } from '@codemirror/state';
import { CursorPosition } from '../components';

export const getCursorPosition = (state: EditorState): CursorPosition => {
  const ln = state.doc.lineAt(state.selection.main.head).number;
  const col = state.selection.ranges[0].head - state.doc.lineAt(state.selection.main.head).from;

  return { ln, col };
};
