import { UnitTestRunner } from '../../utils/test-runners';

export interface Schema {
  name: string;
  directory?: string;
  vendors: { [name: string]: boolean };
  style?: string;
  tags?: string;
  unitTestRunner: UnitTestRunner;
}
