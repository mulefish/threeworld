import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home/index.js'
import ABCDocuments from './pages/ABCDocuments/index.js'
import Viewport from './pages/Viewport/index.js'
const App = () => {

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/ABCDocuments">
            <ABCDocuments />
          </Route>
          <Route exact path="/Viewport">
            <Viewport />
          </Route>
        </Switch>
      </Router>

    </>
  )
}
export default App;



