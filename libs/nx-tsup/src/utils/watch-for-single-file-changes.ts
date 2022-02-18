import { join } from 'path';

import { logger } from '@nrwl/tao/src/shared/logger';

export async function watchForSingleFileChanges(watchDir: string, relativeFilePath: string, callback: () => void) {
  const watcher = await import('@parcel/watcher');
  const subscription = await watcher.subscribe(watchDir, (err, events) => {
    const file = join(watchDir, relativeFilePath);
    if (err) {
      logger.error(`Watch error: ${err?.message ?? 'Unknown'}`);
    } else {
      for (const event of events) {
        if (event.path === file) {
          callback();
          break;
        }
      }
    }
  });

  return () => subscription.unsubscribe();
}
