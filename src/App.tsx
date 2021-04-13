import React, { Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Header from '@components/Header/Header';
import ForceGraph from '@components/Graph/ForceGraph';
import history from './history';

const App = (): JSX.Element => (
      <div>
        <Router history={history}>
          <div>
             <Header />
            <Switch>
              <Route path="/" exact component={ForceGraph} />
            </Switch>
          </div>
        </Router>
      </div>
  )

export default App;
