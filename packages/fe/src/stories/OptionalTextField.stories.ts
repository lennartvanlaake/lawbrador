import OptionalTextField from '../lib/components/common/OptionalTextField.svelte';

export default {
	title: 'OptionalTextField',
	component: OptionalTextField,
	argTypes: {
		value: {
			control: {
				type: 'text'
			}
		}
	}
};

const Template = ({ ...args }) => ({
	Component: OptionalTextField,
	props: { label: 'Label', ...args }
});

export const Filled = Template.bind({});
Filled.args = {
	value: 'bla'
};
export const Empty = Template.bind({});
Empty.args = {
	value: null
};
