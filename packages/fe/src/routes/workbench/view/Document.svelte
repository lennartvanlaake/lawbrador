<script lang="ts">
	import DocumentView from '$lib/components/view/DocumentView.svelte';
	import { defaultRestructure, RestructuredDocument } from '@lawbrador/shared';
	import { queryToHighlight } from '$lib/ts/stores';
	const node1 =
		defaultRestructure(`<h1>Lorem ipsum</h1><p> dolor sit amet, consectetur adipiscing elit. Praesent semper tristique elit, nec laoreet ex sollicitudin eu. Proin eget lectus arcu. Quisque rutrum rutrum leo, et placerat eros ornare non. Fusce fermentum dui eget posuere cursus. Suspendisse potenti. Curabitur interdum facilisis nulla, in pretium risus convallis at. Curabitur nec vestibulum nisi, et dictum mauris. Suspendisse quam nulla, venenatis id congue eu, aliquet sit amet mauris.
</p>
<p>
Maecenas ornare arcu eu arcu ultricies, id mollis leo accumsan. Quisque enim risus, congue eget varius sed, egestas quis lectus. Curabitur efficitur risus sed justo vulputate, vitae finibus odio ornare. Pellentesque auctor leo eget pulvinar sagittis. In viverra nunc a aliquet facilisis. Mauris vitae ex rutrum, rutrum dui vitae, viverra diam. Cras consectetur nisi et sagittis pharetra. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed at iaculis justo. Aenean a dignissim quam. Duis pharetra mauris neque, sit amet malesuada eros pharetra eget. Aliquam vehicula arcu at ipsum volutpat efficitur. Nulla semper ipsum non mattis iaculis. Sed volutpat mattis nunc, non convallis sem ultricies at.
</p>
<p>
Integer eget magna nibh. Maecenas tristique commodo diam, ac vulputate nibh egestas eu. Pellentesque vitae diam dictum, sagittis ante a, feugiat nunc. Etiam in elit et felis rutrum tristique vel a nisi. In congue egestas mi, quis consectetur nisl egestas at. Cras ac elit lectus. Morbi placerat, nibh sed dignissim viverra, dolor diam tristique magna, et varius nibh elit quis risus. Praesent maximus dui molestie tellus finibus, vitae porta nisl tincidunt. Pellentesque in commodo lectus. Praesent sit amet purus in tellus ornare hendrerit. Cras urna nisl, elementum quis auctor eget, vestibulum nec libero. Sed lacinia, quam sed mollis ornare, est ligula ultricies nisi, id pharetra odio lectus quis lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus id semper neque, nec finibus magna.
</p>
<p>
Sed placerat semper justo at rutrum. Mauris at sagittis diam, non mollis velit. Sed gravida posuere mi, ac vestibulum quam sollicitudin nec. Nulla varius nec sem nec vestibulum. In quis fermentum diam. Suspendisse a ex erat. Fusce egestas vitae arcu at ullamcorper. Morbi at mauris ac velit rutrum scelerisque non ac sem. Vestibulum auctor mollis bibendum. Donec et suscipit ipsum. Sed bibendum faucibus lorem tempus convallis. In eu tellus eros. Aliquam maximus erat sit amet lacus imperdiet, eget tempus velit elementum. Aliquam sed ultricies tellus, vitae convallis sapien. Morbi dictum id arcu lacinia pharetra.
</p>

<h1>Curabitur eget</h1><p>tempor tortor. Maecenas facilisis dolor nec pulvinar convallis. Praesent augue tortor, aliquet vitae dui eu, fringilla bibendum nulla. Sed ut libero cursus, venenatis diam eget, maximus nibh. Phasellus at lorem vel odio bibendum congue. Pellentesque quis mi velit. Aliquam vitae scelerisque tellus. Suspendisse hendrerit ultricies tristique. Donec ut sem a leo lacinia consequat a ultricies orci. Nulla nec iaculis tortor, id faucibus risus. Aenean est magna, placerat sed turpis eu, pharetra sollicitudin mauris.
</p>`);
	let document1: RestructuredDocument = {
		reference: {
			url: "#",
			hash: "123",
			name: "testdoc",
			sourceConfigId: "456"
		},
		body: node1
	};
	$queryToHighlight = 'lorem ipsum';
</script>

<DocumentView bind:document={document1} />
