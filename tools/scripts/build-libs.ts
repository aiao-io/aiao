import { affectedLibs } from '../util/affetced.utils';
import { run } from '../util/runner';

export const buildLibs = async () => {
  const libs = affectedLibs();
  if (libs.length) {
    await run('yarn', [`nx run-many --target=build --projects=${libs.join(',')}`]);
  }
};

export default buildLibs();

/**
 * yarn run:tools tools/scripts/build-libs.ts
 */
