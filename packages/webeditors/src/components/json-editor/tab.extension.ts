import { indentLess, insertTab } from '@codemirror/commands';
import { keymap } from '@codemirror/view';

export const tab = keymap.of([
  {
    key: 'Tab',
    preventDefault: true,
    run: insertTab,
  },
  {
    key: 'Shift-Tab',
    preventDefault: true,
    run: indentLess,
  },
]);
