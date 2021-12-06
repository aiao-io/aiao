import { isString } from '@aiao/util';

const hhmm = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d[+-][0-2]\d:[0-5]\d$/;
const hhmmMS = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d{1,}[+-][0-2]\d:[0-5]\d$/;
const z = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\dZ$/;
const zMS = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d{1,}Z$/;

export const isISODateString = (value: any): boolean =>
  isString(value) && (zMS.test(value) || z.test(value) || hhmmMS.test(value) || hhmm.test(value));
