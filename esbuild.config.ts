// esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
	entryPoints: ['src/minimal.ts'], // adjust entry point as needed
	bundle: true,
	outfile: 'dist/minimal-bundle.js',
	format: 'esm', // or 'cjs' if you want CommonJS
	external: ['react', 'react-dom'], // treat these as externals
	sourcemap: true,
	minify: true,
	target: ['esnext'],
	// Add more options as needed
}).catch(() => process.exit(1));
