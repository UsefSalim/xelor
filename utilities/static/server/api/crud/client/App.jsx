import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/todo/Home';
// import Add from './components/todo/Add';
// import Update from './components/todo/Update';
import  './components/todo/Todo.css'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/add">
          <Add />
        </Route>
        <Route path="/update/:id">
          <Update />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;