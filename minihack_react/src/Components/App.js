import React from 'react';
import { Switch, Route } from "react-router-dom";

import Header from './Header';
import CreateGame from './CreateGame';
import PlayGame from "./PlayGame";


function App() {
  return (
      <div className="App container">
        <Header />
        <Switch>
          <Route exact path="/" component={CreateGame} />
          <Route path="/game/:gameId" component={PlayGame} />
        </Switch>
      </div>
  );
}

export default App;
