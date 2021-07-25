import {Paper, Tab, Tabs, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import {Money} from './Money/index';
import useStyle from './style';

export const HomePage = () => {
    const [value, setValue] = useState(0);
    const routes = ['/homepage/incomes', '/homepage/charges'];
    const classes = useStyle();

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div className={classes.homeWrapper}>
            <Typography variant="h3" gutterBottom>
                Home page
            </Typography>
            <BrowserRouter>
                <Route path={'/homepage'} render={() =>(
                    <Paper>
                        <Tabs value={value} onChange={handleChangeTab}>
                            <Tab label={'Incomes'} component={Link} to={routes[0]}/>
                            <Tab label={'Charges'} component={Link} to={routes[1]}/>
                        </Tabs>
                    </Paper>
                )}
                />
                <Switch>
                    <Route path={'/homepage/incomes'}>
                        <Money moneyType={'income'}/>
                    </Route>
                    <Route path={'/homepage/charges'}>
                        <Money moneyType={'charge'} />
                    </Route>
                    <Route exact path={'/homepage/'}>
                        <Redirect to={'/homepage/incomes'} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}