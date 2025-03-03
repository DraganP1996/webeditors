import { Component, h } from '@stencil/core';

@Component({
  tag: 'editor-panel',
  styleUrl: './editor-panel.css',
  shadow: false,
})
export class EditorPanel {
  render() {
    return (
      <div class="editor-panel">
        <slot />
      </div>
    );
  }
}
