import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import ApolloProvider from './components/ApolloProvider/ApolloProvider';
import AuthProvider from './components/Auth/AuthProvider';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Topic from './pages/Topic/Topic';
import TopicAdd from './pages/Topic/TopicAdd';
import TopicDetails from './pages/Topic/TopicDetails';
import Reports from './pages/Reports/Reports';
import { RouterPath } from './enums/RouterPath';
import './index.scss';
import Springboard from './pages/Springboard/Springboard';
import InitiativeAdd from './pages/Initiative/InitiativeAdd';
import Initiative from './pages/Initiative/Initiative';

const App = () => {
  return (
    <AuthProvider>
      <ApolloProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path={RouterPath.TopicAdd} component={TopicAdd} />
            <Route path={RouterPath.TopicDetails} render={props => <TopicDetails {...props} />} />
            <Route path={RouterPath.Topic} component={Topic} />
            <Route path={RouterPath.Reports} component={Reports} />
            <Route exact path={RouterPath.Home} component={Home} />
            <Route path={RouterPath.Springboard} component={Springboard} />
            <Route path={RouterPath.InitiativeAdd} component={InitiativeAdd} />
            <Route path={RouterPath.Initiative} component={Initiative} />
          </Switch>
        </Router>
      </ApolloProvider>
    </AuthProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('react-init'));
