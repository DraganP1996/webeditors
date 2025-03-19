import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { resolve } from 'path';

export const config: Config = {
  namespace: 'webeditors-vanilla',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
      generateTypeDeclarations: true,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    reactOutputTarget({
      // Relative path to where the React components will be generated
      outDir: '../webeditors-react/src/components/stencil-generated/',
    }),
  ],
  testing: {
    browserHeadless: 'shell',
  },
  sourceMap: false,
  rollupPlugins: {
    before: [
      alias({
        entries: [{ find: 'thememirror', replacement: resolve(__dirname, '../../node_modules/thememirror/dist/index.js') }],
      }),
      nodeResolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs({
        include: 'node_modules/**',
        transformMixedEsModules: true,
      }),
    ],
  },
};
