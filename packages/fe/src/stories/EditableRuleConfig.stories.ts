import EditableRuleConfig from '../lib/components/config/EditableRuleConfig.svelte';
import { eurlexConfig } from '@lawbrador/shared/src/examples';

export default {
	title: 'EditableRuleConfig',
	component: EditableRuleConfig
};

const Template = ({ ...args }) => ({
	Component: EditableRuleConfig,
	props: { ...args }
});

export const EurLex = Template.bind({});
EurLex.args = { ruleConfig: eurlexConfig.documentRuleSets[0].bodyRule };
