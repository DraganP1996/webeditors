/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { CursorPosition, EditorFooterConfig, ThemeNames } from "./types/types";
export { CursorPosition, EditorFooterConfig, ThemeNames } from "./types/types";
export namespace Components {
    interface EditorFooter {
        "backgroundColor": string;
        "color": string;
        "cursorPosition"?: CursorPosition;
    }
    interface EditorPanel {
    }
    interface JavascriptEditor {
        /**
          * Method that makes possible to fold all the foldible blocks
         */
        "foldAll": () => Promise<void>;
        /**
          * Configuration for the editor footer
         */
        "footerConfig"?: EditorFooterConfig;
        /**
          * Defines if the editor is in readonly mode Default value false
         */
        "readonly"?: boolean;
        /**
          * Defines if the action panel should be visible
         */
        "showActionsPanel": boolean;
        /**
          * Theme of the editor
         */
        "theme"?: ThemeNames;
        /**
          * Method that makes possible to unfold all the folded
         */
        "unfoldAll": () => Promise<void>;
        /**
          * Value that will be displayed inside the editor
         */
        "value": string;
    }
    interface JsonEditor {
        /**
          * Method that makes possible to fold all the foldible blocks
         */
        "foldAll": () => Promise<void>;
        /**
          * Configuration for the editor footer
         */
        "footerConfig"?: EditorFooterConfig;
        /**
          * Defines the mode of the editor
         */
        "mode": 'json' | 'text';
        /**
          * Defines if the editor is in readonly mode Default value false
         */
        "readonly"?: boolean;
        /**
          * Defines if the action panel should be visible
         */
        "showActionsPanel": boolean;
        /**
          * Theme of the editor
         */
        "theme"?: ThemeNames;
        /**
          * Method that makes possible to unfold all the folded
         */
        "unfoldAll": () => Promise<void>;
        /**
          * Value that will be displayed inside the editor
         */
        "value": string;
    }
    interface XmlEditor {
        /**
          * Method that makes possible to fold all the foldible blocks
         */
        "foldAll": () => Promise<void>;
        /**
          * Configuration for the editor footer
         */
        "footerConfig"?: EditorFooterConfig;
        /**
          * Defines if the editor is in readonly mode Default value false
         */
        "readonly"?: boolean;
        /**
          * Defines if the action panel should be visible
         */
        "showActionsPanel": boolean;
        /**
          * Theme of the editor
         */
        "theme"?: ThemeNames;
        /**
          * Method that makes possible to unfold all the folded
         */
        "unfoldAll": () => Promise<void>;
        /**
          * Value that will be displayed inside the editor
         */
        "value": string;
    }
    interface YamlEditor {
        /**
          * Method that makes possible to fold all the foldible blocks
         */
        "foldAll": () => Promise<void>;
        /**
          * Configuration for the editor footer
         */
        "footerConfig"?: EditorFooterConfig;
        /**
          * Defines if the editor is in readonly mode Default value false
         */
        "readonly"?: boolean;
        /**
          * Defines if the action panel should be visible
         */
        "showActionsPanel": boolean;
        /**
          * Theme of the editor
         */
        "theme"?: ThemeNames;
        /**
          * Method that makes possible to unfold all the folded
         */
        "unfoldAll": () => Promise<void>;
        /**
          * Value that will be displayed inside the editor
         */
        "value": string;
    }
}
export interface JavascriptEditorCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJavascriptEditorElement;
}
export interface JsonEditorCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJsonEditorElement;
}
export interface XmlEditorCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXmlEditorElement;
}
export interface YamlEditorCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLYamlEditorElement;
}
declare global {
    interface HTMLEditorFooterElement extends Components.EditorFooter, HTMLStencilElement {
    }
    var HTMLEditorFooterElement: {
        prototype: HTMLEditorFooterElement;
        new (): HTMLEditorFooterElement;
    };
    interface HTMLEditorPanelElement extends Components.EditorPanel, HTMLStencilElement {
    }
    var HTMLEditorPanelElement: {
        prototype: HTMLEditorPanelElement;
        new (): HTMLEditorPanelElement;
    };
    interface HTMLJavascriptEditorElementEventMap {
        "editorChange": string;
    }
    interface HTMLJavascriptEditorElement extends Components.JavascriptEditor, HTMLStencilElement {
        addEventListener<K extends keyof HTMLJavascriptEditorElementEventMap>(type: K, listener: (this: HTMLJavascriptEditorElement, ev: JavascriptEditorCustomEvent<HTMLJavascriptEditorElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLJavascriptEditorElementEventMap>(type: K, listener: (this: HTMLJavascriptEditorElement, ev: JavascriptEditorCustomEvent<HTMLJavascriptEditorElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLJavascriptEditorElement: {
        prototype: HTMLJavascriptEditorElement;
        new (): HTMLJavascriptEditorElement;
    };
    interface HTMLJsonEditorElementEventMap {
        "editorChange": string;
    }
    interface HTMLJsonEditorElement extends Components.JsonEditor, HTMLStencilElement {
        addEventListener<K extends keyof HTMLJsonEditorElementEventMap>(type: K, listener: (this: HTMLJsonEditorElement, ev: JsonEditorCustomEvent<HTMLJsonEditorElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLJsonEditorElementEventMap>(type: K, listener: (this: HTMLJsonEditorElement, ev: JsonEditorCustomEvent<HTMLJsonEditorElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLJsonEditorElement: {
        prototype: HTMLJsonEditorElement;
        new (): HTMLJsonEditorElement;
    };
    interface HTMLXmlEditorElementEventMap {
        "editorChange": string;
    }
    interface HTMLXmlEditorElement extends Components.XmlEditor, HTMLStencilElement {
        addEventListener<K extends keyof HTMLXmlEditorElementEventMap>(type: K, listener: (this: HTMLXmlEditorElement, ev: XmlEditorCustomEvent<HTMLXmlEditorElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLXmlEditorElementEventMap>(type: K, listener: (this: HTMLXmlEditorElement, ev: XmlEditorCustomEvent<HTMLXmlEditorElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLXmlEditorElement: {
        prototype: HTMLXmlEditorElement;
        new (): HTMLXmlEditorElement;
    };
    interface HTMLYamlEditorElementEventMap {
        "editorChange": string;
    }
    interface HTMLYamlEditorElement extends Components.YamlEditor, HTMLStencilElement {
        addEventListener<K extends keyof HTMLYamlEditorElementEventMap>(type: K, listener: (this: HTMLYamlEditorElement, ev: YamlEditorCustomEvent<HTMLYamlEditorElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLYamlEditorElementEventMap>(type: K, listener: (this: HTMLYamlEditorElement, ev: YamlEditorCustomEvent<HTMLYamlEditorElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLYamlEditorElement: {
        prototype: HTMLYamlEditorElement;
        new (): HTMLYamlEditorElement;
    };
    interface HTMLElementTagNameMap {
        "editor-footer": HTMLEditorFooterElement;
        "editor-panel": HTMLEditorPanelElement;
        "javascript-editor": HTMLJavascriptEditorElement;
        "json-editor": HTMLJsonEditorElement;
        "xml-editor": HTMLXmlEditorElement;
        "yaml-editor": HTMLYamlEditorElement;
    }
}
declare namespace LocalJSX {
    interface EditorFooter {
        "backgroundColor"?: string;
        "color"?: string;
        "cursorPosition"?: CursorPosition;
    }
    interface EditorPanel {
    }
    interface JavascriptEditor {
        /**
          * Configuration for the editor footer
         */
        "footerConfig"?: EditorFooterConfig;
        /**
          * Event triggered by the change of the editor value
         */
        "onEditorChange"?: (event: JavascriptEditorCustomEvent<string>) => void;
        /**
          * Defines if the editor is in readonly mode Default value false
         */
        "readonly"?: boolean;
        /**
          * Defines if the action panel should be visible
         */
        "showActionsPanel"?: boolean;
        /**
          * Theme of the editor
         */
        "theme"?: ThemeNames;
        /**
          * Value that will be displayed inside the editor
         */
        "value"?: string;
    }
    interface JsonEditor {
        /**
          * Configuration for the editor footer
         */
        "footerConfig"?: EditorFooterConfig;
        /**
          * Defines the mode of the editor
         */
        "mode"?: 'json' | 'text';
        /**
          * Event triggered by the change of the editor value
         */
        "onEditorChange"?: (event: JsonEditorCustomEvent<string>) => void;
        /**
          * Defines if the editor is in readonly mode Default value false
         */
        "readonly"?: boolean;
        /**
          * Defines if the action panel should be visible
         */
        "showActionsPanel"?: boolean;
        /**
          * Theme of the editor
         */
        "theme"?: ThemeNames;
        /**
          * Value that will be displayed inside the editor
         */
        "value"?: string;
    }
    interface XmlEditor {
        /**
          * Configuration for the editor footer
         */
        "footerConfig"?: EditorFooterConfig;
        /**
          * Event triggered by the change of the editor value
         */
        "onEditorChange"?: (event: XmlEditorCustomEvent<string>) => void;
        /**
          * Defines if the editor is in readonly mode Default value false
         */
        "readonly"?: boolean;
        /**
          * Defines if the action panel should be visible
         */
        "showActionsPanel"?: boolean;
        /**
          * Theme of the editor
         */
        "theme"?: ThemeNames;
        /**
          * Value that will be displayed inside the editor
         */
        "value"?: string;
    }
    interface YamlEditor {
        /**
          * Configuration for the editor footer
         */
        "footerConfig"?: EditorFooterConfig;
        /**
          * Event triggered by the change of the editor value
         */
        "onEditorChange"?: (event: YamlEditorCustomEvent<string>) => void;
        /**
          * Defines if the editor is in readonly mode Default value false
         */
        "readonly"?: boolean;
        /**
          * Defines if the action panel should be visible
         */
        "showActionsPanel"?: boolean;
        /**
          * Theme of the editor
         */
        "theme"?: ThemeNames;
        /**
          * Value that will be displayed inside the editor
         */
        "value"?: string;
    }
    interface IntrinsicElements {
        "editor-footer": EditorFooter;
        "editor-panel": EditorPanel;
        "javascript-editor": JavascriptEditor;
        "json-editor": JsonEditor;
        "xml-editor": XmlEditor;
        "yaml-editor": YamlEditor;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "editor-footer": LocalJSX.EditorFooter & JSXBase.HTMLAttributes<HTMLEditorFooterElement>;
            "editor-panel": LocalJSX.EditorPanel & JSXBase.HTMLAttributes<HTMLEditorPanelElement>;
            "javascript-editor": LocalJSX.JavascriptEditor & JSXBase.HTMLAttributes<HTMLJavascriptEditorElement>;
            "json-editor": LocalJSX.JsonEditor & JSXBase.HTMLAttributes<HTMLJsonEditorElement>;
            "xml-editor": LocalJSX.XmlEditor & JSXBase.HTMLAttributes<HTMLXmlEditorElement>;
            "yaml-editor": LocalJSX.YamlEditor & JSXBase.HTMLAttributes<HTMLYamlEditorElement>;
        }
    }
}
