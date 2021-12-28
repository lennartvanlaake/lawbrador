const preprocess = require('svelte-preprocess');
/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	config: {
		// Consult https://github.com/sveltejs/svelte-preprocess
		// for more information about preprocessors
		preprocess: preprocess(),

		kit: {
			// hydrate the <div id="svelte"> element in src/app.html
			target: '#svelte',
   vite: {
      ssr: {
        noExternal: [/^@material\//, /^@smui(?:-extra)?\//],
      },
    },
		}
	}
};
