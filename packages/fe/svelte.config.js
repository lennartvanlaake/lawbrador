import preprocess from 'svelte-preprocess';
export default {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	disableDependencyReinclusion: ['svench'],
	preprocess: preprocess({
		typescript: true,
		sourceMap: true
	}),
	kit: {
		target: '#svelte',
		vite: {
			ssr: {
				noExternal: [/^@material\//, /^@smui(?:-extra)?\//]
			}
		}
	}
};
