import { UnitTestRunner } from '../../utils/test-runners';

export interface Schema {
  name: string;
  namespace: string;
  simpleModuleName: boolean;
  directory?: string;

  style?: string;
  tags?: string;

  unitTestRunner: UnitTestRunner;
}
