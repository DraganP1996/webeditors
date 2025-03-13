import { Component, h, Prop, State, Element, Watch, Host, Method, EventEmitter, Event } from '@stencil/core';

import { Compartment, EditorState, Extension } from '@codemirror/state';

import { EditorView, ViewUpdate } from '@codemirror/view';
import { ensureSyntaxTree, foldable, foldEffect, unfoldAll } from '@codemirror/language';

import { THEMES } from '../../styles/themes';
import { CursorPosition, EditorFooterConfig, ThemeNames } from '../../types/types';
import { XML_EXTENSIONS } from './const';

@Component({
  tag: 'xml-editor',
  styleUrl: '../../styles/editor.css',
  shadow: false,
})
export class XMLEditor {
  @Element() el!: HTMLElement;

  /**
   * Value that will be displayed inside the editor
   */
  @Prop() value: string;
  /**
   * Defines if the editor is in readonly mode
   * Default value false
   */
  @Prop() readonly?: boolean;
  /**
   * Configuration for the editor footer
   */
  @Prop() footerConfig?: EditorFooterConfig;
  /**
   * Defines if the action panel should be visible
   */
  @Prop() showActionsPanel: boolean;
  /**
   * Defines if the footer should be visible
   */
  @Prop() showFooter: boolean;

  /**
   * Theme of the editor
   */
  @Prop() theme?: ThemeNames;
  /**
   * Position of the cursor
   */
  @State() private _cursorPosition: CursorPosition;

  /**
   * Method that makes possible to fold all the foldible blocks
   */
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
  /**
   * Method that makes possible to unfold all the folded
   */
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

  /**
   * Event triggered by the change of the editor value
   */
  @Event() editorChange: EventEmitter<string>;

  private _editorView: EditorView;
  private _currentValue: string;
  private _tabSize: Compartment;
  private _currTheme: Compartment;

  @State() private _editorHeight: string;

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

  private _id: string;

  calculateEditorHeight() {
    const panel = this.el.querySelector('div[slot=panel]');
    const panelHeight = panel?.clientHeight || 0;
    const footer = this.el.getElementsByTagName('editor-footer')[0];
    const footerHeight = footer?.clientHeight || 0;

    this._editorHeight = `calc(100% - ${panelHeight + footerHeight}px)`;
  }

  private _initilizeCodeMirror() {
    const extensions: Extension[] = [
      EditorState.readOnly.of(!!this.readonly),
      EditorView.updateListener.of((update: ViewUpdate) => {
        this._updateCursorPosition();

        if (update.docChanged) {
          this._updateCurrentValue(update.state.doc.toString());
        }
      }),
      this._currTheme.of(this.theme ? THEMES[this.theme] : THEMES.amy),
      this._tabSize.of(EditorState.tabSize.of(2)),
      ...XML_EXTENSIONS,
    ];

    const parent = this.el.querySelector(`#${this._id}`)!;

    console.log('Check the parent element', parent);

    const state = EditorState.create({
      doc: this.value,
      extensions,
    });
    this._editorView = new EditorView({
      parent,
      state,
    });

    this.calculateEditorHeight();
  }

  componentWillLoad() {
    this._cursorPosition = { ln: 0, col: 0 };
    this._currentValue = '';
    this._tabSize = new Compartment();
    this._currTheme = new Compartment();
    this._editorHeight = '100%';
    this._id = !!this.el.id ? this.el.id : `json-editor-${Math.random().toString(36).substr(2, 9)}`;
  }

  componentDidLoad() {
    requestAnimationFrame(() => this._initilizeCodeMirror());
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
          {this.showActionsPanel && (
            <editor-panel>
              <slot name="panel" />
            </editor-panel>
          )}
          <div id={this._id} style={{ height: this._editorHeight, width: '100%' }}></div>
          {this.footerConfig && this.showFooter && (
            <editor-footer cursorPosition={this._cursorPosition} backgroundColor={this.footerConfig.backgroundColor} color={this.footerConfig.color} />
          )}
        </div>
      </Host>
    );
  }
}
