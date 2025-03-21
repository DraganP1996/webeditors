import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from '@codemirror/view';
import { EditorState, Extension } from '@codemirror/state';
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { bracketMatching, defaultHighlightStyle, foldGutter, foldKeymap, indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { lintKeymap } from '@codemirror/lint';
import { tab } from '../../shared-extensions';
import { diagnosticsListener, lintExtensions } from './lint.extension';
import { javascript } from '@codemirror/lang-javascript';

export const PLAIN_TEXT_EXTENSIONS: Extension[] = [
  lineNumbers(),
  history(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...searchKeymap, ...historyKeymap, ...foldKeymap, ...completionKeymap, ...lintKeymap]),
  tab,
];

export const JS_EXTENSIONS: Extension[] = [
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  foldGutter(),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  ...lintExtensions,
  diagnosticsListener(),
  javascript({
    typescript: true,
    jsx: true,
  }),
];
