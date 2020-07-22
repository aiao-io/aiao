import { readFileSync } from 'fs-extra';
import globby from 'globby';
import { join } from 'path';

const reg = /<span class="strong">(?<strong>.*)\s+<\/span>\s+<span class="quiet">(?<quiet>.*)<\/span>\s+<span class='fraction'>(?<fraction>.*)<\/span>/;

interface CoverageProcess {
  current: number;
  total: number;
}
export interface CoverageInfo {
  statements: CoverageProcess;
  branches: CoverageProcess;
  functions: CoverageProcess;
  lines: CoverageProcess;
}
export interface ProjectCoverageInfo {
  type: string;
  name: string;
  statements: CoverageProcess;
  branches: CoverageProcess;
  functions: CoverageProcess;
  lines: CoverageProcess;
}

function getHtmlCoverageInfo(html: string) {
  const back: CoverageInfo = {} as any;
  let newHtml = html;
  for (let i = 0; i < 4; i++) {
    const match = reg.exec(newHtml);
    newHtml = newHtml.replace(reg, '');
    if (match.groups) {
      const { quiet, fraction } = match.groups;
      const a = /(?<current>\d+)\/(?<total>\d+)/.exec(fraction);
      const { current, total } = a.groups;
      back[quiet.toLowerCase()] = {
        current: +current,
        total: +total
      };
    }
  }
  return back;
}

export async function getCoverageInfo() {
  const coverageIndexs = await globby(join('coverage', '*/*/index.html'));
  const info = coverageIndexs
    .map(path => {
      const projectNameMatch = /coverage\/(?<type>.*)\/(?<name>.*)\//.exec(path);
      const type = projectNameMatch.groups?.type;
      const name = projectNameMatch.groups?.name;
      const html = readFileSync(path, { encoding: 'utf8' });
      return {
        type,
        name,
        html
      };
    })
    .map(({ html, ...props }) => ({ ...getHtmlCoverageInfo(html), ...props }));
  return info as ProjectCoverageInfo[];
}
