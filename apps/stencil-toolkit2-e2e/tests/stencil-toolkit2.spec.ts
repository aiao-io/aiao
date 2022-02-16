import { checkFilesExist, ensureNxProject, readJson, runNxCommandAsync, uniq } from '@nrwl/nx-plugin/testing';
describe('stencil-toolkit2 e2e', () => {
  it('should create stencil-toolkit2', async () => {
    const plugin = uniq('stencil-toolkit2');
    ensureNxProject('@aiao/stencil-toolkit2', 'dist/libs/stencil-toolkit2');
    await runNxCommandAsync(`generate @aiao/stencil-toolkit2:stencil-toolkit2 ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const plugin = uniq('stencil-toolkit2');
      ensureNxProject('@aiao/stencil-toolkit2', 'dist/libs/stencil-toolkit2');
      await runNxCommandAsync(`generate @aiao/stencil-toolkit2:stencil-toolkit2 ${plugin} --directory subdir`);
      expect(() => checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to the project', async () => {
      const plugin = uniq('stencil-toolkit2');
      ensureNxProject('@aiao/stencil-toolkit2', 'dist/libs/stencil-toolkit2');
      await runNxCommandAsync(`generate @aiao/stencil-toolkit2:stencil-toolkit2 ${plugin} --tags e2etag,e2ePackage`);
      const project = readJson(`libs/${plugin}/project.json`);
      expect(project.tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
