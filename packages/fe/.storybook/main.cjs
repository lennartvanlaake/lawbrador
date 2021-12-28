const path = require('path');

const replaceFileExtension = (filePath, newExtension) => {
	const { name, root, dir } = path.parse(filePath);
	return path.format({
		name,
		root,
		dir,
		ext: newExtension
	});
};

module.exports = {
	core: {
		builder: 'webpack5'
	},
	svelteOptions: {
		preprocess: require('svelte-preprocess')()
	},
	webpackFinal: async (config) => {
		config.resolve = {
			...config.resolve,
			alias: {
				...config.resolve.alias,
				svelte: path.resolve(__dirname, '..', 'node_modules', 'svelte')
			},
			mainFields: ['svelte', 'browser', 'module', 'main']
		};

		config.module.rules.push({
			resolve: {
				fullySpecified: false,
				extensions: ['.js', '.ts']
			}
		});

		const virtualModulesPlugin = config.plugins.find(
			(plugin) => plugin.constructor.name === 'VirtualModulesPlugin'
		);

		// Change the file extension to .cjs for all files that end with "generated-stories-entry.js"
		virtualModulesPlugin._staticModules = Object.fromEntries(
			Object.entries(virtualModulesPlugin._staticModules).map(([key, value]) => {
				if (key.endsWith('generated-stories-entry.js')) {
					return [replaceFileExtension(key, '.cjs'), value];
				}
				return [key, value];
			})
		);

		// Change the entry points to point to the appropriate .cjs files
		config.entry = config.entry.map((entry) => {
			if (entry.endsWith('generated-stories-entry.js')) {
				return replaceFileExtension(entry, '.cjs');
			}
			return entry;
		});

		return config;
	},
	  staticDirs: ['../static'],
stories: [
		// "../src/**/*.stories.mdx",
		'../src/**/*.stories.@(js|jsx|ts|tsx)'
	],
	addons: [
		'@storybook/addon-links',
		{ name: '@storybook/addon-essentials', options: { docs: false } }
	]
};
