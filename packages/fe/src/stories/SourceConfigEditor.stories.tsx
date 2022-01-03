import SourceConfigEditor from '../lib/components/page/SourceConfigEditor.svelte';
import { eurlexConfig } from '@lawbrador/shared/src/examples';

export default {
	title: 'SourceConfigEditor',
	component: SourceConfigEditor
};

const Template = ({ ...args }) => ({
	Component: SourceConfigEditor,
	props: { properties: { ...args } }
});

export const OneItem = Template.bind({});
OneItem.args = { sourceConfigs: [eurlexConfig], sourceConfig: eurlexConfig };
