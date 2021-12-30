const path = require('path');
const preprocess = require('svelte-preprocess');

module.exports = {
	// NOTE! added support for Vite builder
	core: {
		builder: 'storybook-builder-vite'
	},
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-svelte-csf'],
	svelteOptions: {
		preprocess: preprocess({
			typescript: true,
			sourceMap: true
		})
	},
	async viteFinal(config, { configType }) {
		config.resolve.alias['$lib'] = path.resolve(__dirname, '../src/lib');
		config.publicDir = path.resolve(__dirname, '../src/storybook-static');
		return config;
	}
};
