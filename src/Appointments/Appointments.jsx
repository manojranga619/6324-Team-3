import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class AppointmentsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            appointment: {
                doctorName: '',
                location: '',
                time: ''
            },
            errorMessage: '',
            appointments: [
                { doctorName: 'Mr. Moore', location: 'Arlington Public Hospital', time: '05-05-2022 10:00' }
            ]
        };
        this.getAppointments();
        this.addAppointment = this.addAppointment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeAppointment = this.removeAppointment.bind(this);
    }

    addAppointment() {
        let errorMessage = '';
        if (this.state.appointment.doctorName) {
            errorMessage += "Doctor's Name ";
        }

        if (this.state.appointment.location) {
            errorMessage += errorMessage ? "Location " : ", Location ";
        }

        if (this.state.appointment.time) {
            errorMessage += errorMessage ? "Date & Time " : ", Date & Time";
        }
        if (errorMessage) {
            let appointments = this.state.appointments;
            appointments.push(this.state.appointment);
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedInUser.accessToken },
                body: JSON.stringify(this.state.appointment)
            };
            fetch('http://150.158.142.171:8080/api/appointment', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        this.getAppointments();
                        this.setState({ errorMessage: '' })
                    } else {
                    }
                });
        } else {
            errorMessage = "Canno't Add without " + errorMessage;
            this.setState({ errorMessage: errorMessage });
        }
    }
    removeAppointment(item) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedInUser.accessToken },
        };
        fetch('http://150.158.142.171:8080/api/appointment/' + item.id, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.getAppointments();
            });
    }

    handleChange(e) {
        let appointment = this.state.appointment;
        appointment[e.target.name] = e.target.value;
        this.setState({ appointment: appointment });
    }

    getAppointments() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedInUser.accessToken },
        };
        fetch('http://150.158.142.171:8080/api/appointment', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ appointments: data.data });
            });
    }

    render() {
        return (<div>
            <div>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='container'>
                            <h3>Add Appointment</h3>
                            <div>
                                <label>Doctor's Name:</label>
                                <input className='form-control' style={{ width: '400px' }} type='text' value={this.state.appointment.DoctorName} onChange={this.handleChange} name='doctorName' />
                            </div>
                            <div>
                                <label>Location:</label>
                                <input className='form-control' style={{ width: '400px' }} type='text' value={this.state.appointment.location} onChange={this.handleChange} name='location' />
                            </div>
                            <div>
                                <label>Date Time:</label>
                                <input className='form-control' style={{ width: '400px' }} type='date' value={this.state.appointment.time} onChange={this.handleChange} name='time' />
                            </div>
                            <div>
                                {/* {this.state.errorMessage ?? <label>{this.state.errorMessage}</label>} */}
                            </div>
                            <button className='btn btn-primary' style={{ marginTop: '10px' }} onClick={this.addAppointment}>Add Appointment</button>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <h3>Schedules Appointments</h3>
                        {
                            this.state.appointments.map(element => {
                                return (
                                    <div style={{ width: "50rem", border: "2px solid #e7dddd", borderRadius: "2rem", marginTop: "10px" }}>
                                        <div style={{ padding: "10px" }}>
                                            <h3 style={{ marginTop: "10px" }}>{element.doctorName}</h3>
                                            <strong>at:</strong><span style={{ marginLeft: "5px" }}>{element.location}</span><strong style={{ marginLeft: "50px" }}>time:</strong> <span style={{ marginLeft: "5px" }}>{element.time}</span>
                                            {/* <i onClick={this.removeAppointment(element)} className="fa fa-times pull-right" style={{ cursor: 'pointer', marginRight: "20px", color: 'red' }}></i> */}
                                            <i onClick={() => this.removeAppointment(element)} className="fa fa-times pull-right" style={{ cursor: 'pointer', marginRight: "20px", color: 'red' }}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>);
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

const connectedAppointmentsPage = connect(mapState, actionCreators)(AppointmentsPage);
export { connectedAppointmentsPage as AppointmentsPage };