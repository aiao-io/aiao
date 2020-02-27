import { randomArrayItem } from './randomArrayItem';
import { PlainObject } from './types';

export const randomObjectKey = (obj: PlainObject): string => randomArrayItem(Object.keys(obj));
