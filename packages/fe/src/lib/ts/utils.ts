import { browser } from '$app/env';

export async function doIfEnter(event: KeyboardEvent, f: () => Promise<void>) {
	if (event.key == 'Enter') {
		await f();
	}
}

export function scrollToCenter(elementIdWithHashtag: string) {
	if (!browser) return;
	if (!elementIdWithHashtag) return;
	const elementId = elementIdWithHashtag.substring(1);
	if (!elementId) return;
	const targetElement = document.getElementById(elementId);
	scrollElementToCenter(targetElement);
}

export function scrollElementToCenter(element: Element | null) {
	element?.scrollIntoView({ block: 'center' });
}

export function scrollToBottomSreen() {
	if (!browser) return;
	window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
}
