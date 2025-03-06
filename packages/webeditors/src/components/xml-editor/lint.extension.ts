import { Diagnostic, linter, lintGutter, setDiagnosticsEffect } from '@codemirror/lint';
import { EditorView } from 'codemirror';
import { XMLValidator, ValidationError } from 'fast-xml-parser';

const gutter = lintGutter();
const tooltipTheme = EditorView.theme({
  '.cm-tooltip-lint': { backgroundColor: 'red', padding: '4px', borderRadius: '10px' },
});

const xmlLinter = (view: EditorView) => {
  const diagnostics = [];
  const text = view.state.doc.toString();
  const validation = XMLValidator.validate(text);

  if (typeof validation === 'boolean' && validation === true) return diagnostics;

  const validationError = validation as ValidationError;

  console.log('THE ERROR', validationError);
  const errorMessage = validationError.err.msg || 'Error';

  diagnostics.push({
    from: 0,
    to: text.length,
    severity: 'error',
    message: errorMessage,
  });
  return diagnostics;
};

const extension = linter(xmlLinter);

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
