import { browser } from '$app/env';

export async function doIfEnter(event: KeyboardEvent, f: () => Promise<void>) {
	if (event.key == 'Enter') {
		await f();
	}
}

export function scrollToCenter(elementId: string) {
	console.log('scrolling');
	if (!browser || !elementId) return;
	const targetElement = document.getElementById(elementId);
	scrollElementToCenter(targetElement);
}

export function scrollElementToCenter(element: Element | null) {
	element?.scrollIntoView({ block: 'center' });
}

export function scrollToBottomSreen() {
	if (!browser) return;
	window.scrollTo({ left: 0, top: document.body.scrollHeight });
}
