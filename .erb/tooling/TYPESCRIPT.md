# Type checking

Run `npm run typecheck` to check all four environments. The root tsconfig is a
solution file; `tsc --noEmit` alone does not check its referenced projects.

- `tsconfig.main.json`: Electron main and preload, Node globals.
- `tsconfig.renderer.json`: browser globals, no automatic Node or Jest types.
- `tsconfig.tooling.json`: build and maintenance scripts, Node globals.
- `tsconfig.test.json`: tests and their imports, Node, DOM, and Jest globals.

Put cross-process contracts in `src/shared` without Electron or Node imports.
Each project has its own incremental state under the ignored `.erb/dll` directory.
Transpilation and linting still use the isolated TypeScript 6 compiler API tools.

Main and tooling skip third-party declaration checking because Electron and some
webpack plugins expose browser-only types. Application code is still checked
without DOM globals in those environments. Renderer and test declarations remain
fully checked.
