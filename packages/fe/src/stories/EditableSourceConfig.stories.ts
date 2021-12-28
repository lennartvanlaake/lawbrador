import EditableSourceConfig from '../lib/components/config/EditableSourceConfig.svelte';
import { eurlexConfig } from '@lawbrador/shared/src/examples';

export default {
	title: 'EditableSourceConfig',
	component: EditableSourceConfig
};

const Template = ({ ...args }) => ({
	Component: EditableSourceConfig,
	props: { ...args }
});

export const EurLex = Template.bind({});
EurLex.args = { sourceConfig: eurlexConfig };
