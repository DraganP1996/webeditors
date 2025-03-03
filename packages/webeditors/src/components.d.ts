/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ThemeNames } from "./components/json-editor/types";
export { ThemeNames } from "./components/json-editor/types";
export namespace Components {
    interface JsonEditor {
        /**
          * Theme of the editor
         */
        "theme"?: ThemeNames;
        /**
          * Value that will be displayed inside the editor
         */
        "value": string;
    }
}
declare global {
    interface HTMLJsonEditorElement extends Components.JsonEditor, HTMLStencilElement {
    }
    var HTMLJsonEditorElement: {
        prototype: HTMLJsonEditorElement;
        new (): HTMLJsonEditorElement;
    };
    interface HTMLElementTagNameMap {
        "json-editor": HTMLJsonEditorElement;
    }
}
declare namespace LocalJSX {
    interface JsonEditor {
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
        "json-editor": JsonEditor;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "json-editor": LocalJSX.JsonEditor & JSXBase.HTMLAttributes<HTMLJsonEditorElement>;
        }
    }
}
