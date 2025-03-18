import { EditorView } from 'codemirror';

export const onValueChange = (editorView: EditorView, value: string) => {
  const currentSelection = editorView.state.selection;

  editorView.dispatch({
    changes: {
      from: 0,
      to: editorView.state.doc.length,
      insert: value,
    },
    selection: currentSelection,
  });
};
