import { Component, h, Host, Prop } from '@stencil/core';
import { CursorPosition } from '../../types/types';

@Component({
  tag: 'editor-footer',
  styleUrl: './editor-footer.css',
  shadow: false,
})
export class EditorFooter {
  @Prop() cursorPosition?: CursorPosition;
  @Prop() backgroundColor: string;
  @Prop() color: string;

  render() {
    return (
      <Host
        style={{
          backgroundColor: this.backgroundColor,
          color: this.color,
        }}
      >
        <div class="editor-footer">
          Ln {this.cursorPosition?.ln || 0}, Col {this.cursorPosition?.col || 0}{' '}
        </div>
      </Host>
    );
  }
}
