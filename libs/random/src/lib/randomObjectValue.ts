import { randomObjectKey } from './randomObjectKey';
import { PlainObject } from './types';

export const randomObjectValue = (obj: PlainObject) => obj[randomObjectKey(obj)];
