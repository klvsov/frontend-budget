import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Navbar} from './components/Navbar'
import {Charts} from "./components/Charts";
import {HomePage} from "./components/HomePage";
import {Categories} from "./components/Categories";
import {Registration} from "./components/Auth";

import useStyle from './style';

export const App = () => {
  const classes = useStyle();
  
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <main className={classes.main}>
          <Switch>
            <Route path="/register" exact>
              <Registration/>
            </Route>
            <Route path="/homepage/incomes" exact>
              <HomePage/>
            </Route>
            <Route path="/charts" exact>
              <Charts/>
            </Route>
            <Route path="/categories" exact>
              <Categories/>
            </Route>
            <Route path="/" exact>
              <HomePage/>
            </Route>
            <Route path="/homepage" exact>
              <HomePage/>
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}