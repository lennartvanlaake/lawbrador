import path from 'path';
import { fileURLToPath } from 'url';

// note: Kit apps are type:module, so Node's __dirname is not available
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
	vite: {
		server: {
			host: '0.0.0.0'
		},
		resolve: {
			alias: {
				// automatically extracting the paths that are hardcoded here from Kit's config will
				// probably be one of the main hassle to be able to offer automatic support :-/
				$app: path.resolve(__dirname, '.svelte-kit/dev/runtime/app'),
				$lib: path.resolve(__dirname, 'src/lib')
			}
		}
	}
};
