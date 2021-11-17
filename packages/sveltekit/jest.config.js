export default {
	transform: {
		'^.+\\.svelte$': 'svelte-jester',
		'^.+\\.ts$': 'ts-jest'
	},
	moduleFileExtensions: ['ts', 'js', 'svelte']
};
