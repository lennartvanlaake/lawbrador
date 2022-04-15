import { Validator } from './validate';
import { Schemas } from '@lawbrador/shared';
import { expect } from 'chai';

describe('test validation', () => {
	it('throws exception on invalid url config', () => {
		const validator = new Validator(Schemas.urlComponent);
		const errors = validator.validate({});
		// throws exceptions for not having a value, not having a variableName and matching neither variable/staic as schema
		expect(errors?.all?.length).to.eq(3);
	});
	it('Accept valid config', () => {
		const validator = new Validator(Schemas.urlComponent);
		const urlComponent = { variableName: 'x' };
		const errors = validator.validate(urlComponent);
		expect(!!errors).to.be.false;
	});
});
