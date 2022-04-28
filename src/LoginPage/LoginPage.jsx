import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { HomePage } from '../HomePage';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            loginSuccessful: false,
            submitted: false,
            isError: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        this.setState({ submitted: true });
        e.preventDefault();
        if (this.state.username && this.state.password) {
            let reqBody = {
                username: this.state.username,
                password: this.state.password
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            };
            fetch('http://150.158.142.171:8080/api/auth/signin', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        localStorage.setItem("loggedInUser", JSON.stringify(data.data));
                        this.setState({ loginSuccessful: true });
                    } else {
                        this.setState({ isError: true });
                    }
                });
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted, loginSuccessful } = this.state;

        let ele, error = <div></div>;
        if (this.state.isError) {
            error = <label style={{ color: 'red' }}>Invalid Username or Password.</label>
        }
        if (!loginSuccessful || this.props.isLoggedOut) { // && this.props['isLoggedOut'] && !this.props.isLoggedOut) {
            ele = (
                <div style={{backgroundImage: `url(${ 'src/20043.png'})`, height: '710px', backgroundSize: 'contain'}}>
                    <h1 style={{ paddingLeft: '500px', fontWeight: 'bold' }}>Public Health Monitoring System</h1>
                    <div className="jumbotron" style={{ marginLeft: '450px', marginRight: '450px'}}>
                        <div className="container">
                            <div className="col-sm-12">
                                <div className="col-md-12">
                                    <h2>Login</h2>
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                            <label htmlFor="username">User Name</label>
                                            <input type="text" style={{height: '45px'}} className="form-control" name="username" value={username} onChange={this.handleChange} />
                                            {submitted && !username &&
                                                <div className="help-block">Username is required</div>
                                            }
                                        </div>
                                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                            <label htmlFor="password">Password</label>
                                            <input type="password" style={{height: '45px'}} className="form-control" name="password" value={password} onChange={this.handleChange} />
                                            {submitted && !password &&
                                                <div className="help-block">Password is required</div>
                                            }
                                        </div>
                                        {error}
                                        <div className="form-group">
                                            <button style={{height: '40px'}} className="btn btn-primary">Login</button>
                                            {loggingIn &&
                                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            }
                                            <Link to="/register" style={{height: '40px'}} className="btn btn-link">Register</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            );
        } else {
            ele = <HomePage />
        }
        return (ele);
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };