import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

const src = path.resolve(__dirname, 'src');

const topDirs = fs
	.readdirSync(src, { withFileTypes: true })
	.filter(d => d.isDirectory())
	// полезно отфильтровать служебные папки, если вдруг есть
	.filter(d => !d.name.startsWith('.'))
	.map(d => d.name);

const alias = Object.fromEntries(
	topDirs.map(name => [name, path.join(src, name)])
);

export default defineConfig({
	plugins: [react()],
	resolve: { alias },
});
