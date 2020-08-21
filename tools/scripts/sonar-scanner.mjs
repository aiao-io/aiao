import fs from 'fs-extra';
import globby from 'globby';

async function sonarScanner() {
  const tsconfigs = await globby('{apps,libs}/*/tsconfig.json');

  tsconfigs.forEach(d => {
    const json = fs.readJsonSync(d);
    json.include = ['**/*.ts'];
    fs.writeJSONSync(d, json, { spaces: 2 });
  });
}

sonarScanner();
