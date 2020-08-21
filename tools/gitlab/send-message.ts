import { readJsonSync, writeJSONSync } from 'fs-extra';
import { cloneDeep } from 'lodash';
import { env } from 'process';

import { CoverageInfo, getCoverageInfo, ProjectCoverageInfo } from '../util/get-coverage-info';
import { gitlabAPI } from './gitlab-api';
import { isGitlabMergeRequest } from './util';

const { CI_PROJECT_ID, CI_MERGE_REQUEST_IID } = env;
const OVERAGE_PATH = '.coverage-report.json';
const DEFAULT_COVERAGE_STATUS: CoverageInfo = {
  statements: { current: 0, total: 0 },
  branches: { current: 0, total: 0 },
  functions: { current: 0, total: 0 },
  lines: { current: 0, total: 0 }
};

function numFixed(num: number) {
  if (isNaN(num)) {
    return 0;
  }
  return (num * 100).toFixed(2);
}

function temp(a: number, b: number, c: number, d: number) {
  const pt = a / b - c / d;
  let lab = '';
  if (pt > 0) {
    lab = '↗';
  } else if (pt < 0) {
    lab = '↘';
  }
  let back = `**${numFixed(a / b)}%** \`${a}/${b}\``;

  if (lab) {
    back += lab;
  }

  return back + '|';
}
function getProjectInfoMdBody(status: CoverageInfo, oldStatus: CoverageInfo = DEFAULT_COVERAGE_STATUS) {
  let body = '';
  const {
    statements: { current: isc, total: ist },
    branches: { current: ibc, total: ibt },
    functions: { current: ifc, total: ift },
    lines: { current: ilc, total: ilt }
  } = status;

  const {
    statements: { current: isc2, total: ist2 },
    branches: { current: ibc2, total: ibt2 },
    functions: { current: ifc2, total: ift2 },
    lines: { current: ilc2, total: ilt2 }
  } = oldStatus;

  body += temp(isc, ist, isc2, ist2);
  body += temp(ibc, ibt, ibc2, ibt2);
  body += temp(ifc, ift, ifc2, ift2);
  body += temp(ilc, ilt, ilc2, ilt2);
  return body;
}

function addHeader() {
  let header = '|项目|Statements|Branches|Functions|Lines|';
  header += '\n|-|-|-|-|-|';
  return header;
}

export function getAllStatus(porjects: ProjectCoverageInfo[]) {
  const all = cloneDeep(DEFAULT_COVERAGE_STATUS);
  const { statements, branches, functions, lines } = all;

  porjects.forEach(porject => {
    const {
      statements: { current: isc, total: ist },
      branches: { current: ibc, total: ibt },
      functions: { current: ifc, total: ift },
      lines: { current: ilc, total: ilt }
    } = porject;
    statements.current += isc;
    statements.total += ist;
    branches.current += ibc;
    branches.total += ibt;
    functions.current += ifc;
    functions.total += ift;
    lines.current += ilc;
    lines.total += ilt;
  });
  return all;
}

export function getProjectInfoMd(porjects: ProjectCoverageInfo[], old: ProjectCoverageInfo[] = []) {
  if (porjects.length === 0) {
    return '';
  }
  let body = addHeader();
  porjects.forEach(info => {
    body += `\n${info.name}|`;
    body += getProjectInfoMdBody(
      info,
      old.find(d => d.name === info.name)
    );
  });
  return body;
}

export async function sendMessage() {
  const infos = await getCoverageInfo();
  let oldInfos: ProjectCoverageInfo[] = [];
  try {
    oldInfos = readJsonSync(OVERAGE_PATH, { encoding: 'utf8' });
  } catch (error) {}
  // 应用状态
  const apps = getProjectInfoMd(
    infos.filter(d => d.type === 'apps'),
    oldInfos
  );

  // 库状态
  const libs = getProjectInfoMd(
    infos.filter(d => d.type === 'libs'),
    oldInfos
  );

  // 忽略 total 为 0 的情况
  const needInfos = infos.filter(
    d => d.statements.total !== 0 || d.lines.total !== 0 || d.branches.total !== 0 || d.functions.total !== 0
  );

  // // 全部状态
  const allStstus = getAllStatus(infos);
  const statements = allStstus.statements.current / allStstus.statements.total || 0;
  const lines = allStstus.lines.current / allStstus.lines.total || 0;
  const branches = allStstus.branches.current / allStstus.branches.total || 0;
  const functions = allStstus.functions.current / allStstus.functions.total || 0;
  const coverage = (statements + lines + branches + functions) / needInfos.length;
  // post body
  let body = '';
  if (apps) {
    body += `\n\n**Apps**\n\n${apps}`;
  }
  if (libs) {
    body += `\n\n**Libs**\n\n${libs}`;
  }

  if ((apps || libs) && isGitlabMergeRequest()) {
    await gitlabAPI.post(`projects/${CI_PROJECT_ID}/merge_requests/${CI_MERGE_REQUEST_IID}}/discussions`, {
      body
    });
    writeJSONSync(OVERAGE_PATH, infos);
  }
  console.log(`coverage | ${numFixed(coverage)}`);
}

sendMessage();
