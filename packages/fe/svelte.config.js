import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';

export default {
	disableDependencyReinclusion: ['svench'],
	preprocess: preprocess({
		typescript: true
	}),
	kit: {
		vite: {
			ssr: {
				noExternal: [/^@smui(?:-extra)?\//]
			},
			server: {
				host: '0.0.0.0'
			}
		},
		adapter: adapter({ out: 'dist' })
	}
};
