import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import alias from '@rollup/plugin-alias';
import { resolve } from 'path';

export const config: Config = {
  namespace: 'webeditors',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
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
  rollupPlugins: {
    before: [
      alias({
        entries: [{ find: 'thememirror', replacement: resolve(__dirname, '../../node_modules/thememirror/dist/index.js') }],
      }),
    ],
  },
};
