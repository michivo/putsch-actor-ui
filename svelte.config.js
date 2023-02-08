import adapter from "sveltekit-adapter-firebase";
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			outDir: 'build',
			functionName: 'handler',
			nodeVersion: '16'
		  }),
		},
};