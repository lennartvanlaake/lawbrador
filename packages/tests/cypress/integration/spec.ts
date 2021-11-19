describe('Test if it creates a new page', () => {
	it('Access index page', () => {
		const TEXT = 'doekmans';
		cy.visit('/');
		cy.get('#text-field').type(TEXT);
		cy.get('button').trigger('click');
		cy.contains(TEXT).click();
		cy.url().should('include', 'text');
		cy.get('p').should('contain.text', TEXT);
	});
});
