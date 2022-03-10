export async function doIfEnter(event: KeyboardEvent, f: () => Promise<void>) {
	if (event.key == 'Enter') {
		await f();
	}
}
