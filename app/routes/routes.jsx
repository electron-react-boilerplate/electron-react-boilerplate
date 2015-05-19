import React from 'react'
import { Route, DefaultRoute } from 'react-router'
import AppContainer from '../containers/AppContainer'
import HomePageContainer from '../containers/HomePageContainer'
import AboutPageContainer from '../containers/AboutPageContainer'


export default (
  <Route path="/" handler={AppContainer}>
    <DefaultRoute handler={HomePageContainer} />
    <Route name="about" handler={AboutPageContainer} />
  </Route>
)
