import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { LoginPage } from '../LoginPage/LoginPage';

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedOut: false
        };
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    logout() {
        this.setState({ isLoggedOut: true });
    }

    render() {
        const { user, users } = this.props;
        let ele;
        if (this.state.isLoggedOut) {
            ele = <LoginPage isLoggedOut={true} />
        }
        else {
            ele = (
                <div className="col-md-6 col-md-offset-3">
                    <h1>Welcome!!!</h1>
                    <button className="form-control" onClick={this.logout}>Logout</button>
                </div>
            );
        }
        return ele;
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };