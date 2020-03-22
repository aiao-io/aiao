import { UnitTestRunner } from '../../utils/test-runners';

export interface Schema {
  name: string;
  directory?: string;
  style?: string;
  tags?: string;
  unitTestRunner: UnitTestRunner;
}
