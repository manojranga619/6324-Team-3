import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class AppointmentsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            appointment: {
                DoctorsName: '',
                Location: '',
                Time: ''
            },
            errorMessage: '',
            appointments: [
                { DoctorsName: 'Mr. Moore', Location: 'Arlington Public Hospital', Time: '05-05-2022 10:00' }
            ]
        };
        this.addAppointment = this.addAppointment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeAppointment = this.removeAppointment.bind(this);
    }

    addAppointment() {
        let errorMessage = '';
        if (this.state.appointment.DoctorsName) {
            errorMessage += "Doctor's Name ";
        }

        if (this.state.appointment.Location) {
            errorMessage += errorMessage ? "Location ": ", Location ";
        }

        if (this.state.appointment.Time) {
            errorMessage += errorMessage ? "Date & Time ": ", Date & Time";
        }
        if (errorMessage) {
            let appointments = this.state.appointments;
            appointments.push(this.state.appointment);
            this.setState({ appointments: appointments, errorMessage: '' });
        } else {
            errorMessage = "Canno't Add without " + errorMessage;
            this.setState({ errorMessage: errorMessage });
        }

    }
    removeAppointment(item) {
        let appointments = this.state.appointments;
        appointments = appointments.filter((ele) => ele.DoctorsName !== item.DoctorsName);
        this.setState({ appointments: appointments });
    }

    handleChange(e) {
        let appointment = this.state.appointment;
        appointment[e.target.name] = e.target.value;
        this.setState({ appointment: appointment });
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
                                <input className='form-control' style={{ width: '400px' }} type='text' value={this.state.appointment.DoctorName} onChange={this.handleChange} name='DoctorsName' />
                            </div>
                            <div>
                                <label>Location:</label>
                                <input className='form-control' style={{ width: '400px' }} type='text' value={this.state.appointment.Location} onChange={this.handleChange} name='Location' />
                            </div>
                            <div>
                                <label>Date Time:</label>
                                <input className='form-control' style={{ width: '400px' }} type='date' value={this.state.appointment.Time} onChange={this.handleChange} name='Time' />
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
                                            <h3 style={{marginTop: "10px"}}>{element.DoctorsName}</h3>
                                            <strong>at:</strong><span style={{marginLeft: "5px"}}>{element.Location}</span><strong style={{marginLeft: "50px"}}>time:</strong> <span style={{marginLeft: "5px"}}>{element.Time}</span>
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