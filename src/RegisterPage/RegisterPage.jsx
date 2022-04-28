import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { HomePage } from '../HomePage';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                userName: '',
                email: '',
                password: ''
            },
            submitted: false,
            registered: false,
            isError: false,
            errorMessage: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            },
            isError: false,
            errorMessage: false
        });
    }

    handleSubmit(event) {
        this.setState({ submitted: true });
        event.preventDefault();
        if (this.state.user.userName && this.state.user.password && this.state.user.email
            && this.state.user.userName.length > 4 && this.state.user.password.length > 7
            && this.state.user.email && ValidateEmail(this.state.user.email)
        ) {
            let reqBody = {
                username: this.state.user.userName,
                password: this.state.user.password,
                email: this.state.user.email,
                role: [
                    "user",
                    "admin"
                ]
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqBody)
            };
            fetch('http://43.155.86.152:8080/api/auth/signup', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        // localStorage.setItem("loggedInUser", data.data);
                        this.setState({ registered: true });
                    } else {
                        this.setState({ isError: true, errorMessage: data.message });
                    }
                });
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted, registered } = this.state;
        let ele;
        if (registered) {
            ele = <HomePage></HomePage>
        } else {
            ele = (
                <div style={{ backgroundImage: `url(${'src/20043.png'})`, height: '710px', backgroundSize: 'contain' }}>
                    <h1 style={{ paddingLeft: '500px', fontWeight: 'bold' }}>Public Health Monitoring System</h1>
                    <div className="jumbotron" style={{ marginLeft: '450px', marginRight: '450px'}}>
                        <div className="container">
                            <div className="col-sm-8 col-sm-offset-2">
                                <div className="col-md-6 col-md-offset-3">
                                    <h2>Register</h2>
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <div className={'form-group' + (submitted && (!user.userName || user.userName.length < 5) ? ' has-error' : '')}>
                                            <label htmlFor="userName">User Name</label>
                                            <input type="text" className="form-control" name="userName" value={user.userName} onChange={this.handleChange} />
                                            {submitted && !user.userName &&
                                                <div className="help-block">User Name is required</div>
                                            }
                                            {submitted && user.userName && user.userName.length < 5 &&
                                                <div className="help-block">Username should be atleast 5 charecters</div>
                                            }
                                        </div>
                                        <div className={'form-group' + (submitted && (!user.email || !ValidateEmail(user.email)) ? ' has-error' : '')}>
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                                            {submitted && !user.email &&
                                                <div className="help-block">Email</div>
                                            }
                                            {submitted && user.email && !ValidateEmail(user.email) &&
                                                <div className="help-block">Invalid Email format. (Valid emails: mysite@ourearth.com, my.ownsite@ourearth.org, mysite@you.me.net)</div>
                                            }

                                        </div>
                                        <div className={'form-group' + (submitted && (!user.password || user.password.length < 8) ? ' has-error' : '')}>
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                                            {submitted && !user.password &&
                                                <div className="help-block">Password is required</div>
                                            }
                                            {submitted && user.password && user.password.length < 8 &&
                                                <div className="help-block">Password should be atleast 8 charecters</div>
                                            }
                                        </div>
                                        {this.state.isError &&
                                            <label style={{ color: 'red' }}>{this.state.errorMessage}</label>
                                        }
                                        <div className="form-group">
                                            <button className="btn btn-primary">Register</button>
                                            {registering &&
                                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            }
                                            <Link to="/login" className="btn btn-link">Login</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
        return (ele);
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true);
    }
    return (false);
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };