import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'next/link': path.resolve(__dirname, './src/compat/next-link.tsx'),
        'next/navigation': path.resolve(__dirname, './src/compat/next-navigation.ts'),
        'next/image': path.resolve(__dirname, './src/compat/next-image.tsx'),
        'next/headers': path.resolve(__dirname, './src/compat/next-headers.ts'),
      },
    },
  },
});
