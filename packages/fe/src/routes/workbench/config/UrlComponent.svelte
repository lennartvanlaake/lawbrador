<script lang="ts">
	import View from '$lib/components/workbench/View.svelte';
	import EditableUrlComponent from '$lib/components/config/EditableUrlComponent.svelte';
	const value = { value: 'bla' };
	const variable = { variableName: 'var' };
	const variableWithOptions = {
		variableName: 'var',
		possibleValues: [
			{ value: '1', displayName: 'first' },
			{ value: '2', displayName: 'second' }
		]
	};
	const emptyValue = { value: '' };
	const emptyVariable = { variableName: '' };
	const variableWithEmptyOptions = {
		variableName: 'var',
		possibleValues: []
	};
</script>

<View name="static">
	<EditableUrlComponent config={value} />
</View>
<View name="variable">
	<EditableUrlComponent config={variable} />
</View>
<View name="variable with options">
	<EditableUrlComponent config={variableWithOptions} />
</View>
<View name="empty static">
	<EditableUrlComponent config={emptyValue} />
</View>
<View name="empty variable">
	<EditableUrlComponent config={emptyVariable} />
</View>
<View name="variable with empty options">
	<EditableUrlComponent config={variableWithEmptyOptions} />
</View>
