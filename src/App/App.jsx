import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { NotesPage } from '../Notes/Notes';
import { DietPlanPage } from '../Diet/Diet';
import { BMIPage } from '../BMI/BMIPage';
import { AppointmentsPage } from '../Appointments/Appointments';
import { CommunicationPage } from '../Communication/Communication';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/home" component={HomePage} />
                        <Route path="/Notes" component={NotesPage} />
                        <Route path="/diet" component={DietPlanPage} />
                        <Route path="/bmi" component={BMIPage} />
                        <Route path="/appointments" component={AppointmentsPage} />
                        <Route path="/contact" component={CommunicationPage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };