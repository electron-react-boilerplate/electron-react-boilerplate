// Compiler API consumers use the JavaScript compiler in the tooling package.
// The project's `tsc` command remains the latest native TypeScript compiler.
const { createRequire } = require('node:module');
const toolingRequire = createRequire(
  require.resolve('../tooling/package.json'),
);

toolingRequire('ts-node').register({
  compiler: toolingRequire.resolve('typescript'),
  transpileOnly: true,
});
