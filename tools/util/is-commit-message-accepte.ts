import { WORKSPACE_SCOPES, WORKSPACE_TYPES } from '../workspace';

export function isCommitMessageAccepte(message: string) {
  const match = /(?<type>[a-z-]+)\((?<scope>[a-z-]+)\):/.exec(message);
  const type = match?.groups?.type;
  const scope = match?.groups?.scope;
  const matchCommit = type && scope && WORKSPACE_SCOPES.includes(scope) && WORKSPACE_TYPES.includes(type);
  const matchRevert = /revert/gi.test(message);
  const matchRelease = /release/gi.test(message);
  const matchWIP = /WIP/gi.test(message);

  return +!(matchRelease || matchRevert || matchWIP || matchCommit) === 0;
}
