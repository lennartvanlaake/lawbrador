describe('Test if it creates a new page', () => {
	it('Access index page', () => {
		cy.visit('/');
		cy.get('#text-field').type('doekmans');
		cy.get('#text-field').type('torrrrie');
		cy.get('#text-field').type('haaaat');
		cy.get('button').click();
	});
});
