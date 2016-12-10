// flow-typed signature: 50bc453586282fb18e63201750049659
// flow-typed version: e6f7626e10/minimist_v1.x.x/flow_>=v0.28.x

declare module 'minimist' {
  declare type minimistOptions = {
    string?: string | Array<string>,
    boolean?: boolean | string | Array<string>,
    alias?: { [arg: string]: string | Array<string> },
    default?: { [arg: string]: any },
    stopEarly?: boolean,
    // TODO: Strings as keys don't work...
    // '--'? boolean,
    unknown?: (param: string) => boolean
  };

  declare type minimistOutput = {
    _: Array<string>,
    [flag: string]: string | boolean
  };

  declare module.exports: (argv: Array<string>, opts?: minimistOptions) => minimistOutput;
}
