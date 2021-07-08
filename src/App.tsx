import React, { Router } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Header from '@components/Header/Header';
import ForceGraph from '@components/Graph/ForceGraph';
import history from './history';

const App = (): JSX.Element => (
      <div className="application-body">
        <Router history={history}>
          <div>
             <Header />
            <ForceGraph />
          </div>
        </Router>
      </div>
  )

export default App;
