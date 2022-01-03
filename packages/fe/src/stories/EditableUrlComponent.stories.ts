import EditableUrlComponent from '../lib/components/config/EditableUrlComponent.svelte';

export default {
	title: 'EditableUrlComponent',
	component: EditableUrlComponent
};

const Template = ({ ...args }) => ({
	Component: EditableUrlComponent,
	props: { config: { ...args } }
});

export const ValueFilled = Template.bind({});
ValueFilled.args = {
	value: 'bla'
};
export const VariableFilled = Template.bind({});
ValueFilled.args = {
	variableName: 'bla'
};
