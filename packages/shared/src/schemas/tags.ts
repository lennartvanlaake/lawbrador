import { Type } from '@sinclair/typebox';
import { ALL_MARKUP_NOTATIONS, ALL_TAG_NAMES } from './tagConstants';

export const tagName = Type.Union(ALL_TAG_NAMES.map((it) => Type.Literal(it)));

export const markupNotation = Type.Union(ALL_MARKUP_NOTATIONS.map((it: any) => Type.Literal(it)));
