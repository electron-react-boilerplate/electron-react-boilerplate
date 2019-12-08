import React from 'react';
import { Switch, Route, useLocation } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import IntroPage from './containers/IntroPage';
import CounterPage from './containers/CounterPage';
import QuizPage from './containers/QuizPage';
import HomeButton from './components/HomeButton';
import ResultPage from './containers/ResultPage';

export default function Routes() {
  const { pathname } = useLocation();

  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.INTRODUCTION} component={IntroPage} />
        <Route path={routes.QUIZ} component={QuizPage} />
        <Route path={routes.RESULT} component={ResultPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
      {pathname === '/' || <HomeButton />}
    </App>
  );
}
