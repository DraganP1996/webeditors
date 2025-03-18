import { ensureSyntaxTree, foldable, foldEffect } from '@codemirror/language';
import { EditorView } from 'codemirror';

export const foldAll = async (editorView: EditorView) => {
  const effects = [];

  ensureSyntaxTree(editorView.state, editorView.state.doc.length, 500).iterate({
    from: 0,
    to: editorView.state.doc.length,
    enter: node => {
      const foldRange = foldable(editorView.state, node.from, node.to);

      if (!foldRange || (foldRange.from === 0 && foldRange.to === editorView.state.doc.length) || (foldRange.from === 1 && foldRange.to === editorView.state.doc.length - 1))
        return;

      effects.push(foldEffect.of({ from: foldRange.from, to: foldRange.to }));
    },
  });

  if (effects.length) {
    editorView.dispatch({ effects });
  }
};
