import { Component, h, Prop, State, Element, Watch, Host } from '@stencil/core';

import { Compartment, EditorState } from '@codemirror/state';
import { json } from '@codemirror/lang-json';
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { lintKeymap } from '@codemirror/lint';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from '@codemirror/view';
import { bracketMatching, defaultHighlightStyle, foldGutter, foldKeymap, indentOnInput, syntaxHighlighting } from '@codemirror/language';

import { THEMES } from './themes';
import { tab } from './tab.extension';
import { diagnosticsListener, lintExtensions } from './lint.extension';
import { ThemeNames } from './types';

@Component({
  tag: 'json-editor',
  styleUrl: './json-editor.css',
  shadow: false,
})
export class JsonEditor {
  @Element() el!: HTMLElement;

  /**
   * Value that will be displayed inside the editor
   */
  @Prop() value: string;

  @Prop() readonly = false;

  /**
   * Theme of the editor
   */
  @Prop() theme?: ThemeNames;
  // @Prop() onLintError?: (error: Diagnostic) => void;

  private _editorState: EditorState;

  @Watch('theme')
  onThemeChange(theme: ThemeNames) {
    theme && this._setTheme(theme);
  }

  @Watch('value')
  onValueChange(value: string) {
    this._editorView.dispatch({
      changes: {
        from: 0,
        to: this._editorView.state.doc.length,
        insert: value,
      },
    });
  }

  private _editorView: EditorView;

  private _tabSize: Compartment = new Compartment();
  private _currTheme = new Compartment();

  private _setTheme(theme: ThemeNames) {
    this._editorView.dispatch({
      effects: this._currTheme.reconfigure(THEMES[theme]),
    });
  }

  @State() private _id = !!this.el.id ? this.el.id : `id_${Date.now().toString()}`;

  // private _changeTabSize(size: number) {
  //   this._editorView.dispatch({
  //     effects: this._tabSize.reconfigure(EditorState.tabSize.of(size)),
  //   });
  // }

  componentDidLoad() {
    if (this._editorView) return;

    const targetElement = document.querySelector(`#${this._id}`)!;

    this._editorState = EditorState.create({
      doc: this.value,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        EditorState.readOnly.of(this.readonly),
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
        this._currTheme.of(this.theme ? THEMES[this.theme] : THEMES.amy),
        diagnosticsListener(),
        // this.theme ? THEMES[this.theme] : THEMES.amy,
        keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...searchKeymap, ...historyKeymap, ...foldKeymap, ...completionKeymap, ...lintKeymap]),
        json(),
        tab,
        this._tabSize.of(EditorState.tabSize.of(2)),
      ],
    });
    this._editorView = new EditorView({
      parent: targetElement,
      state: this._editorState,
    });
  }

  render() {
    return (
      <Host
        style={{
          display: 'block',
          height: '100%',
        }}
      >
        <div class="editor-wrapper">
          <editor-panel>
            <slot name="panel" />
          </editor-panel>
          <div id={this._id} style={{ height: '100%', width: '100%' }}></div>
        </div>
      </Host>
    );
  }
}
