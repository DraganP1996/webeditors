import { Component, h, Prop, State, Element, Watch, Host, Method, EventEmitter, Event } from '@stencil/core';

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
  ViewUpdate,
} from '@codemirror/view';
import {
  bracketMatching,
  defaultHighlightStyle,
  ensureSyntaxTree,
  foldable,
  foldEffect,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
  unfoldAll,
} from '@codemirror/language';

import { THEMES } from './themes';
import { tab } from './tab.extension';
import { diagnosticsListener, lintExtensions } from './lint.extension';
import { CursorPosition, EditorFooterConfig, ThemeNames } from './types';

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

  @Prop() footerConfig?: EditorFooterConfig;

  /**
   * Theme of the editor
   */
  @Prop() theme?: ThemeNames;
  // @Prop() onLintError?: (error: Diagnostic) => void;

  @State() private _cursorPosition: CursorPosition = { ln: 0, col: 0 };

  @Method() async foldAll(): Promise<void> {
    const effects = [];

    ensureSyntaxTree(this._editorView.state, this._editorView.state.doc.length, 500).iterate({
      from: 0,
      to: this._editorView.state.doc.length,
      enter: node => {
        const foldRange = foldable(this._editorView.state, node.from, node.to);

        if (
          !foldRange ||
          (foldRange.from === 0 && foldRange.to === this._editorView.state.doc.length) ||
          (foldRange.from === 1 && foldRange.to === this._editorView.state.doc.length - 1)
        )
          return;

        effects.push(foldEffect.of({ from: foldRange.from, to: foldRange.to }));
      },
    });

    if (effects.length) {
      this._editorView.dispatch({ effects });
    }
  }

  @Method() async unfoldAll(): Promise<void> {
    unfoldAll(this._editorView);
  }

  @Watch('theme')
  onThemeChange(theme: ThemeNames) {
    theme && this._setTheme(theme);
  }

  @Watch('value')
  onValueChange(value: string) {
    const currentSelection = this._editorView.state.selection;

    this._editorView.dispatch({
      changes: {
        from: 0,
        to: this._editorView.state.doc.length,
        insert: value,
      },
      selection: currentSelection,
    });
  }

  @Event() editorChange: EventEmitter<string>;

  private _editorView: EditorView;
  private _currentValue = '';
  private _tabSize: Compartment = new Compartment();
  private _currTheme = new Compartment();
  private _editorHeight: string;

  private _setTheme(theme: ThemeNames) {
    this._editorView.dispatch({
      effects: this._currTheme.reconfigure(THEMES[theme]),
    });
  }

  private _updateCurrentValue(value: string) {
    if (value.trim() === this._currentValue.trim()) return;

    this._currentValue = value;
    this.editorChange.emit(this._currentValue);
  }

  private _updateCursorPosition() {
    const state = this._editorView.state;
    const ln = state.doc.lineAt(state.selection.main.head).number;
    const col = state.selection.ranges[0].head - state.doc.lineAt(state.selection.main.head).from;

    if (col === this._cursorPosition.col && ln === this._cursorPosition.ln) return;

    this._cursorPosition = { col, ln };
  }

  @State() private _id = !!this.el.id ? this.el.id : `id_${Date.now().toString()}`;

  calculateEditorHeight() {
    const panel = this.el.querySelector('div[slot=panel]');
    const panelHeight = panel?.clientHeight || 0;
    const footer = this.el.getElementsByTagName('editor-footer')[0];
    const footerHeight = footer?.clientHeight || 0;

    this._editorHeight = `calc(100% - ${panelHeight + footerHeight}px)`;
  }

  componentDidLoad() {
    if (this._editorView) return;

    const parent = document.querySelector(`#${this._id}`)!;
    const state = EditorState.create({
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
        EditorView.updateListener.of((update: ViewUpdate) => {
          this._updateCursorPosition();

          if (update.docChanged) {
            this._updateCurrentValue(update.state.doc.toString());
          }
        }),
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
      parent,
      state,
    });

    this.calculateEditorHeight();
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
          <div id={this._id} style={{ height: this._editorHeight, width: '100%' }}></div>
          {this.footerConfig && <editor-footer cursorPosition={this._cursorPosition} backgroundColor={this.footerConfig.backgroundColor} color={this.footerConfig.color} />}
        </div>
      </Host>
    );
  }
}
