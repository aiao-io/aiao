import toInteger from 'lodash/toInteger';

import { addMonths } from './addMonths';

// 添加季度
export const addQuarters = (date: Date, quarter: number) => addMonths(date, toInteger(quarter) * 3);
