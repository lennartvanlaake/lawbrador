import Ajv, { ErrorObject, ValidateFunction } from 'ajv';
import { Type } from '@sinclair/typebox';
import type { TObject } from '@sinclair/typebox';

const ajv = new Ajv();

interface ValidatorResult {
	isValid: Boolean;
	errorList?: ErrorObject<any>[] | null;
	errorMap?: Record<String, ErrorObject<any>[]>;
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
			errorList: this.validator.errors,
			errorMap: this.validator.errors?.reduce((a, e) => {
				let propName = e.instancePath.substring(1);
				if (a[propName]) {
					a[propName] = [...a[propName], e];
				} else {
					a[propName] = [e];
				}
				return a;
			}, {})
		};
	}
}
