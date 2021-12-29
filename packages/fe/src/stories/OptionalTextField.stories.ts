import OptionalTextField from '../lib/components/common/OptionalTextField.svelte';

export default {
	title: 'OptionalTextField',
	component: OptionalTextField
};

const Template = ({ ...args }) => ({
	Component: OptionalTextField,
	props: { ...args }
});

export const Filled = Template.bind({});
Filled.args = {
	value: 'bla'
};
export const Empty = Template.bind({});
Empty.args = {
	value: null
};
