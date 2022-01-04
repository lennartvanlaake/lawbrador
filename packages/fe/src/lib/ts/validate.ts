import Ajv, { ErrorObject, ValidateFunction } from 'ajv';
import { Type } from '@sinclair/typebox';
import type { TObject } from '@sinclair/typebox';

const ajv = new Ajv();

interface ValidatorResult {
	isValid: Boolean;
	errors?: ErrorObject<any>[] | null;
}

export class Validator {
	validator: ValidateFunction;
	constructor(schema: TObject<any>) {
		this.validator = ajv.compile(Type.Strict(schema));
	}
	validate(value: any): ValidatorResult {
		let isValid = this.validator(value);
		return {
			isValid: isValid,
			errors: this.validator.errors
		};
	}
}
