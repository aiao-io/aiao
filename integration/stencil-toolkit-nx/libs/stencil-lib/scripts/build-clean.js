const { join } = require('path');
const { unlinkSync, writeFileSync } = require('fs');

const elelementsReactProject = join(__dirname, '../../react-lib');

try {
  unlinkSync(join(elelementsReactProject, 'src/lib/react-component-lib/createControllerComponent.tsx'));
  unlinkSync(join(elelementsReactProject, 'src/lib/react-component-lib/createOverlayComponent.tsx'));
} catch {}

writeFileSync(
  join(elelementsReactProject, 'src/lib/react-component-lib/index.ts'),
  `export { createReactComponent } from './createComponent';`
);
