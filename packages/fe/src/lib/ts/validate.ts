import type { ErrorObject, ValidateFunction } from 'ajv';
import type { TObject, TUnion, TIntersect } from '@sinclair/typebox';
import { ajv } from '@lawbrador/shared';

export class Validator {
	validator: ValidateFunction;
	constructor(schema: TObject<any> | TUnion<any> | TIntersect<any>) {
		this.validator = ajv.compile(schema);
	}
	validate(value: any): Record<string, ErrorObject[]> | undefined {
		this.validator(value);
		const map = this.validator.errors?.reduce((a, e) => {
			const propName = e.instancePath.split('/')[1];
			if (propName && a[propName]) {
				a[propName] = [...(a[propName] ?? []), e];
			} else {
				a[propName] = [e];
			}
			return a;
		}, {} as Record<string, ErrorObject[]>);
		if (this.validator.errors && map) {
			map.all = this.validator.errors;
		}
		return map;
	}
}

export function getImprovedErrorMessages(
	errors: ErrorObject[] | undefined,
	level = 1,
	label = ''
): string[] | undefined {
	if (!errors) return undefined;
	return [
		...new Set(
			errors.map((e) => {
				const path = e.instancePath.split('/');
				const isChildError = path.length > level;
				if (isChildError) {
					console.log(path);
					const childNumber = parseInt(path[level]) + 1;
					if (childNumber) {
						return `Value number ${childNumber} is invalid`;
					} else {
						return `Property ${path[level]} is invalid`;
					}
				} else {
					return `${label} ${e.message}`;
				}
			})
		)
	];
}
