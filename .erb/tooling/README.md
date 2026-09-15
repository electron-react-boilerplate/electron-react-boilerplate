# Compiler API tooling

The root project uses the latest TypeScript 7 CLI for type-checking. TypeScript 7
no longer provides the JavaScript compiler API consumed by ts-node,
ts-jest, and typescript-eslint. Their latest releases still need TypeScript 6.

This separate, locked package installs those tools with TypeScript 6.0.3, the
latest JavaScript compiler release. Root `postinstall` runs its `npm ci` before
building. Keeping a separate install prevents npm from hoisting API consumers
beside the incompatible root compiler. Do not turn it into a workspace or a
linked root dependency without testing that resolution.

`.erb/scripts/register.cjs`, ESLint, and Jest resolve their tools from
this package explicitly. `npm exec tsc -- --noEmit` uses the root TypeScript 7
compiler and checks both application and electron-vite configuration code.

To update tooling, run `npm --prefix .erb/tooling update` and commit its lockfile.
Move the tools back to the root when their compiler API supports TypeScript 7.

The root ESLint configuration uses `@eslint/compat` for React, JSX accessibility,
and import plugins whose peer ranges still stop at ESLint 9. Scoped npm overrides
allow those plugins to use ESLint 10; no global peer-dependency checks are disabled.
