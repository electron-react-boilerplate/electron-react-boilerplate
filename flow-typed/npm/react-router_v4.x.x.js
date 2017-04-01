// flow-typed signature: 71d6f309a9d8ddb697f108d53ec68559
// flow-typed version: fb2079e84e/react-router_v4.x.x/flow_>=v0.38.x

declare module 'react-router' {
  // NOTE: many of these are re-exported by react-router-dom and
  // react-router-native, so when making changes, please be sure to update those
  // as well.
  declare export type Location = {
    pathname: string,
    search: string,
    hash: string,
    state?: any,
    key?: string,
  }

  declare export type LocationShape = {
    pathname?: string,
    search?: string,
    hash?: string,
    state?: any,
  }

  declare export type HistoryAction = 'PUSH' | 'REPLACE' | 'POP'

  declare export type RouterHistory = {
    length: number,
    location: Location,
    action: HistoryAction,
    listen(callback: (location: Location, action: HistoryAction) => void): () => void,
    push(path: string | LocationShape, state?: any): void,
    replace(path: string | LocationShape, state?: any): void,
    go(n: number): void,
    goBack(): void,
    goForward(): void,
    canGo?: (n: number) => bool,
    block(callback: (location: Location, action: HistoryAction) => boolean): void,
    // createMemoryHistory
    index?: number,
    entries?: Array<Location>,
  }

  declare export type Match = {
    params: Object,
    isExact: boolean,
    path: string,
    url: string,
  }

  declare export type ContextRouter = RouterHistory & {
    match: Match,
  }

  declare export type GetUserConfirmation =
    (message: string, callback: (confirmed: boolean) => void) => void

  declare type StaticRouterContext = {
    url?: string,
  }

  declare export class StaticRouter extends React$Component {
    props: {
      basename?: string,
      location?: string | Location,
      context: StaticRouterContext,
      children?: React$Element<*>,
    }
  }

  declare export class MemoryRouter extends React$Component {
    props: {
      initialEntries?: Array<LocationShape | string>,
      initialIndex?: number,
      getUserConfirmation?: GetUserConfirmation,
      keyLength?: number,
      children?: React$Element<*>,
    }
  }

  declare export class Router extends React$Component {
    props: {
      history: RouterHistory,
      children?: React$Element<*>,
    }
  }

  declare export class Prompt extends React$Component {
    props: {
      message: string | (location: Location) => string | true,
      when?: boolean,
    }
  }

  declare export class Redirect extends React$Component {
    props: {
      to: string | LocationShape,
      push?: boolean,
    }
  }

  declare export class Route extends React$Component {
    props: {
      component?: ReactClass<*>,
      render?: (router: ContextRouter) => React$Element<*>,
      children?: (router: ContextRouter) => React$Element<*>,
      path?: string,
      exact?: bool,
      strict?: bool,
    }
  }

  declare export class Switch extends React$Component {
    props: {
      children?: Array<React$Element<*>>,
    }
  }

  declare type FunctionComponent<P> = (props: P) => ?React$Element<any>;
  declare type ClassComponent<D, P, S> = Class<React$Component<D, P, S>>;
  declare export function withRouter<P, S>(Component: ClassComponent<void, P, S> | FunctionComponent<P>): ClassComponent<void, $Diff<P, ContextRouter>, S>;

  declare type MatchPathOptions = {
    exact?: boolean,
    strict?: boolean,
  }
  declare export function matchPath(pathname: string, path: string, options?: MatchPathOptions): null | Match
}
