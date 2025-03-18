import { Diagnostic, linter, lintGutter, setDiagnosticsEffect } from '@codemirror/lint';
import { EditorView } from 'codemirror';
import { Linter } from 'eslint-linter-browserify';
import { Linter as L } from 'eslint';

const eslintConfig: L.Config = {
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
  rules: {
    semi: 'off',
  },
};

const jsLinter = linter(view => {
  const code = view.state.doc.toString();
  const linter = new Linter();
  const results = linter.verify(code, eslintConfig);

  return results.map(result => ({
    from: result.column - 1,
    to: result.endColumn ? result.endColumn - 1 : result.column,
    severity: result.severity === 2 ? 'error' : 'warning',
    message: result.message,
  }));
});

const extension = jsLinter;
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
  });

export const lintExtensions = [extension, gutter, tooltipTheme];
