import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {Navbar} from './components/Navbar'
import {Charts} from "./components/Charts";
import {HomePage} from "./components/HomePage";
import {Categories} from "./components/Categories";

import useStyle from './style';

export const App = () => {
    const classes = useStyle();

  return (
    <div className="App">
        <Router>
            <Navbar />
            <main className={classes.main}>
                <Switch>
                    <Route path="/homepage">
                        <HomePage />
                    </Route>
                    <Route path="/charts">
                        <Charts />
                    </Route>
                    <Route path="/categories" exact>
                        <Categories />
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/homepage" />
                    </Route>
                    <Route>
                      <HomePage />
                    </Route>
                </Switch>
            </main>
        </Router>
    </div>
  );
}