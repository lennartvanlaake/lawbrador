import EditableUrlConfig from '../lib/components/config/EditableUrlConfig.svelte';
import { eurlexConfig } from '@lawbrador/shared/src/examples';

export default {
	title: 'EditableUrlConfig',
	component: EditableUrlConfig
};

const Template = ({ ...args }) => ({
	Component: EditableUrlConfig,
	props: { config: { ...args } }
});

export const EurLex = Template.bind({});
EurLex.args = {
	urlConfig: eurlexConfig.searchUrlConfig
};
