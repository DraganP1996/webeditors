import { Diagnostic, linter, lintGutter, setDiagnosticsEffect } from '@codemirror/lint';
import { EditorView } from 'codemirror';
import { parseDocument } from 'yaml';

const gutter = lintGutter();
const tooltipTheme = EditorView.theme({
  '.cm-tooltip-lint': { backgroundColor: 'red', padding: '4px', borderRadius: '10px' },
});

const yamlLinter = async (view: EditorView) => {
  const diagnostics = [];
  const text = view.state.doc.toString();
  const yamlDocument = parseDocument(text);

  if (yamlDocument.errors.length) {
    yamlDocument.errors.forEach(error => {
      diagnostics.push({
        from: 0,
        to: 0,
        severity: 'error',
        message: error.message,
      });
    });
  }

  return diagnostics;
};

const extension = linter(yamlLinter);

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
  });

export const lintExtensions = [extension, gutter, tooltipTheme];
