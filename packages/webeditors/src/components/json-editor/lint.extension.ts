import { jsonParseLinter } from '@codemirror/lang-json';
import { Diagnostic, linter, lintGutter, setDiagnosticsEffect } from '@codemirror/lint';
import { EditorView } from 'codemirror';

const extension = linter(jsonParseLinter());
const gutter = lintGutter();
const tooltipTheme = EditorView.theme({
  '.cm-tooltip-lint': { backgroundColor: 'red', padding: '4px', borderRadius: '10px' },
});

// Create an update listener extension.
export const diagnosticsListener = (callback?: (diagnostics: Diagnostic[]) => void) =>
  EditorView.updateListener.of(update => {
    const diagnostics = [];

    // Loop through each transaction in the update.
    for (let tr of update.transactions) {
      // Look for the diagnostics effect.
      for (let effect of tr.effects) {
        if (effect.is(setDiagnosticsEffect)) {
          diagnostics.push(effect.value);
        }
      }
    }

    if (callback) callback(diagnostics);
    console.log('New diagnostics:', diagnostics);
  });

export const lintExtensions = [extension, gutter, tooltipTheme];
