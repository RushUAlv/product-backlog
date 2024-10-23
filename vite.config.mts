import fs from 'fs';
import path from 'path';

import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, UserConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

function stripDevAssets() {
  return {
    name: 'strip-dev-assets',
    resolveId(source: string) {
      return source === 'virtual-module' ? source : null;
    },
    renderStart(outputOptions: any) {
      const outDir = outputOptions.dir;
      const mockServiceWorker = path.resolve(outDir, 'mockServiceWorker.js');
      const mockReviewCsvDir = path.resolve(outDir, 'review-mock.csv');
      fs.rmdir(mockServiceWorker, () => console.info(`Deleted ${mockServiceWorker}`));
      fs.rmdir(mockReviewCsvDir, () => console.info(`Deleted ${mockReviewCsvDir}`));
    },
  };
}

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  const config: UserConfig = {
    plugins: [
      tsconfigPaths(),
      TanStackRouterVite(),
      react(),
      checker({
        typescript: true,
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        },
      }),
      svgr(),
    ],
  };
  if (isProduction) {
    config.plugins?.push(stripDevAssets());
  }
  return config;
});
