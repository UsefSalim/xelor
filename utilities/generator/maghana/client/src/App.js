import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import './App.css';
import Home from './pages/Home'
const App =()=> {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
