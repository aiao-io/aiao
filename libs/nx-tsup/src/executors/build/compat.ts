import { convertNxExecutor } from '@nrwl/devkit';

import tsupRunExecutor from './executor';

export default convertNxExecutor(tsupRunExecutor);
