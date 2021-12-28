import NodeView from '../lib/components/view/NodeView.svelte';
export default {
    title: 'Node view',
    component: NodeView
};
const Template = ({ ...args }) => ({
    Component: NodeView,
    props: { node: { ...args } }
});
export const TextOnly = Template.bind({});
TextOnly.args = {
    text: 'bla'
};
export const Paragraph = Template.bind({});
Paragraph.args = {
    name: 'p',
    children: [{ text: 'bla' }]
};
export const Div = Template.bind({});
Div.args = {
    name: 'div',
    children: [
        { name: 'p', children: [{ text: 'bla' }] },
        { name: 'p', children: [{ text: 'diebla' }] }
    ]
};
//# sourceMappingURL=NodeView.stories.js.map