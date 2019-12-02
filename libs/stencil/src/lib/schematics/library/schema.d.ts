import { UnitTestRunner } from '../../utils/test-runners';

export interface Schema {
  name: string;
  simpleModuleName: boolean;
  directory?: string;
  vendors: { [name: string]: boolean };
  style?: string;
  tags?: string;

  unitTestRunner: UnitTestRunner;
}
