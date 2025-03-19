import { Component, h, Prop, State, Element, Watch, Host, Method, EventEmitter, Event } from '@stencil/core';

import { Compartment, EditorState, Extension } from '@codemirror/state';

import { EditorView, ViewUpdate } from '@codemirror/view';
import { unfoldAll } from '@codemirror/language';

import { THEMES } from '../../styles/themes';
import { CursorPosition, EditorFooterConfig, ThemeNames } from '../../types/types';
import { JS_EXTENSIONS, PLAIN_TEXT_EXTENSIONS } from './const';
import { onValueChange, setTheme, getCursorPosition, foldAll } from '../../utils';

@Component({
  tag: 'javascript-editor',
  styleUrl: '../../styles/editor.css',
  shadow: false,
})
export class JavascriptEditor {
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
    return foldAll(this._editorView);
  }
  /**
   * Method that makes possible to unfold all the folded
   */
  @Method() async unfoldAll(): Promise<void> {
    unfoldAll(this._editorView);
  }

  @Watch('theme')
  onThemeChange(theme: ThemeNames) {
    theme && setTheme(this._editorView, theme, this._currTheme);
  }

  @Watch('value')
  onValueChange(value: string) {
    onValueChange(this._editorView, value);
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

  private _updateCurrentValue(value: string) {
    if (value.trim() === this._currentValue.trim()) return;

    this._currentValue = value;
    this.editorChange.emit(this._currentValue);
  }

  private _updateCursorPosition() {
    const { col, ln } = getCursorPosition(this._editorView.state);

    if (col === this._cursorPosition.col && ln === this._cursorPosition.ln) return;

    this._cursorPosition = { col, ln };
  }

  private _initializeCodeMirror() {
    const parent = this.el.querySelector(`#${this._id}`)!;
    const plainExtensions: Extension[] = [
      EditorState.readOnly.of(!!this.readonly),
      EditorView.updateListener.of((update: ViewUpdate) => {
        this._updateCursorPosition();

        if (update.docChanged) {
          this._updateCurrentValue(update.state.doc.toString());
        }
      }),
      this._currTheme.of(this.theme ? THEMES[this.theme] : THEMES.amy),
      this._tabSize.of(EditorState.tabSize.of(2)),
      ...PLAIN_TEXT_EXTENSIONS,
    ];

    const extensions = [...plainExtensions, ...JS_EXTENSIONS];

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

  private _id: string;

  calculateEditorHeight() {
    const panel = this.el.querySelector('div[slot=panel]');
    const panelHeight = panel?.clientHeight || 0;
    const footer = this.el.getElementsByTagName('editor-footer')[0];
    const footerHeight = footer?.clientHeight || 0;

    this._editorHeight = `calc(100% - ${panelHeight + footerHeight}px)`;
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
    requestAnimationFrame(() => this._initializeCodeMirror());
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
          {this.footerConfig && <editor-footer cursorPosition={this._cursorPosition} backgroundColor={this.footerConfig.backgroundColor} color={this.footerConfig.color} />}
        </div>
      </Host>
    );
  }
}
