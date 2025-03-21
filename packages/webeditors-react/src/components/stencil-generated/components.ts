'use client';

/**
 * This file was automatically generated by the Stencil React Output Target.
 * Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
 */

/* eslint-disable */

import type { EventName, StencilReactComponent } from '@stencil/react-output-target/runtime';
import { createComponent } from '@stencil/react-output-target/runtime';
import React from 'react';
import { EditorFooter as EditorFooterElement, defineCustomElement as defineEditorFooter } from "webeditors-vanilla/dist/components/editor-footer.js";
import { EditorPanel as EditorPanelElement, defineCustomElement as defineEditorPanel } from "webeditors-vanilla/dist/components/editor-panel.js";
import { JavascriptEditor as JavascriptEditorElement, defineCustomElement as defineJavascriptEditor } from "webeditors-vanilla/dist/components/javascript-editor.js";
import { JsonEditor as JsonEditorElement, defineCustomElement as defineJsonEditor } from "webeditors-vanilla/dist/components/json-editor.js";
import { XmlEditor as XmlEditorElement, defineCustomElement as defineXmlEditor } from "webeditors-vanilla/dist/components/xml-editor.js";
import { YamlEditor as YamlEditorElement, defineCustomElement as defineYamlEditor } from "webeditors-vanilla/dist/components/yaml-editor.js";

type EditorFooterEvents = NonNullable<unknown>;

export const EditorFooter: StencilReactComponent<EditorFooterElement, EditorFooterEvents> = /*@__PURE__*/ createComponent<EditorFooterElement, EditorFooterEvents>({
    tagName: 'editor-footer',
    elementClass: EditorFooterElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: {} as EditorFooterEvents,
    defineCustomElement: defineEditorFooter
});

type EditorPanelEvents = NonNullable<unknown>;

export const EditorPanel: StencilReactComponent<EditorPanelElement, EditorPanelEvents> = /*@__PURE__*/ createComponent<EditorPanelElement, EditorPanelEvents>({
    tagName: 'editor-panel',
    elementClass: EditorPanelElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: {} as EditorPanelEvents,
    defineCustomElement: defineEditorPanel
});

type JavascriptEditorEvents = { onEditorChange: EventName<CustomEvent<string>> };

export const JavascriptEditor: StencilReactComponent<JavascriptEditorElement, JavascriptEditorEvents> = /*@__PURE__*/ createComponent<JavascriptEditorElement, JavascriptEditorEvents>({
    tagName: 'javascript-editor',
    elementClass: JavascriptEditorElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: { onEditorChange: 'editorChange' } as JavascriptEditorEvents,
    defineCustomElement: defineJavascriptEditor
});

type JsonEditorEvents = { onEditorChange: EventName<CustomEvent<string>> };

export const JsonEditor: StencilReactComponent<JsonEditorElement, JsonEditorEvents> = /*@__PURE__*/ createComponent<JsonEditorElement, JsonEditorEvents>({
    tagName: 'json-editor',
    elementClass: JsonEditorElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: { onEditorChange: 'editorChange' } as JsonEditorEvents,
    defineCustomElement: defineJsonEditor
});

type XmlEditorEvents = { onEditorChange: EventName<CustomEvent<string>> };

export const XmlEditor: StencilReactComponent<XmlEditorElement, XmlEditorEvents> = /*@__PURE__*/ createComponent<XmlEditorElement, XmlEditorEvents>({
    tagName: 'xml-editor',
    elementClass: XmlEditorElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: { onEditorChange: 'editorChange' } as XmlEditorEvents,
    defineCustomElement: defineXmlEditor
});

type YamlEditorEvents = { onEditorChange: EventName<CustomEvent<string>> };

export const YamlEditor: StencilReactComponent<YamlEditorElement, YamlEditorEvents> = /*@__PURE__*/ createComponent<YamlEditorElement, YamlEditorEvents>({
    tagName: 'yaml-editor',
    elementClass: YamlEditorElement,
    // @ts-ignore - React type of Stencil Output Target may differ from the React version used in the Nuxt.js project, this can be ignored.
    react: React,
    events: { onEditorChange: 'editorChange' } as YamlEditorEvents,
    defineCustomElement: defineYamlEditor
});
