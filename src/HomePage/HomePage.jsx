import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { LoginPage } from '../LoginPage/LoginPage';

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedOut: false,
            vitalSign: {
                name: '',
                startDate: '',
                frequencyPerWeek: '',
                frequencyPerDay: '',
                time: '',
                metric: ''
            },
            medication: {
                name: '',
                startDate: '',
                frequencyPerWeek: '',
                dosage: '',
                time: ''
            },
            vitalSigns: [
            ],
            medications: [
                {
                    id: 1,
                    name: 'Glucotrol',
                    startDate: '03-24-2022',
                    frequencyPerWeek: 'Weekly',
                    frequencyPerDay: 'Once',
                    dosage: 'Once in a Day',
                    time: '12:00 PM'
                },
                {
                    id: 2,
                    name: 'fludrocortisone',
                    startDate: '03-24-2022',
                    frequencyPerDay: 'Once',
                    frequencyPerWeek: 'Dialy',
                    dosage: 'Once in a Day',
                    time: '20:00 AM'
                },
                {
                    id: 3,
                    name: 'tylenol',
                    startDate: '03-24-2022',
                    frequencyPerWeek: 'Dialy',
                    frequencyPerDay: 'Once',
                    dosage: 'Once in a Day',
                    time: '08:00 AM'
                }
            ]
        };
        this.logout = this.logout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleMedicationChange = this.handleMedicationChange.bind(this);
        this.saveVitalSign = this.saveVitalSign.bind(this);
        this.saveMedication = this.saveMedication.bind(this);
        this.deleteVitalSign = this.deleteVitalSign.bind(this);
        this.getVitalSigns();
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

    addVitalSign() {
        $('#myModal').modal('show');
    }
    closeVitalSign() {
        $('#myModal').modal('hide');
    }

    addMedication() {
        $('#myModalMedication').modal('show');
    }

    getVitalSigns() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedInUser.accessToken },
        };
        fetch('http://150.158.142.171:8080/api/vital', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    let vitalSigns = data.data;
                    // vitalSigns = vitalSigns.concat(vitalSigns);
                    // vitalSigns = vitalSigns.concat(vitalSigns);
                    this.setState({ vitalSigns: vitalSigns });
                } else {
                }
            });
    }

    deleteVitalSign(id) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedInUser.accessToken },
        };
        fetch('http://150.158.142.171:8080/api/vital/' + id, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    this.setState({ vitalSigns: data.data });
                } else {
                }
            });
    }

    getMedicationss() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedInUser.accessToken },
        };
        fetch('http://150.158.142.171:8080/api/sign/feed', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                } else {
                }
            });
    }

    saveVitalSign() {
        const postObj = {};
        postObj.name = this.state.vitalSign.name;
        postObj.frequency = this.state.vitalSign.frequencyPerWeek === '1' ? 'dialy' : 'weekly';
        postObj.frequencyDay = this.state.vitalSign.frequencyPerDay;
        postObj.metrics = this.state.vitalSign.metric;
        postObj.time = this.state.vitalSign.startDate;
        postObj.startDate = this.state.vitalSign.startDate;
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedInUser.accessToken },
            body: JSON.stringify(postObj)
        };
        fetch('http://150.158.142.171:8080/api/vital', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    this.getVitalSigns();
                    this.closeVitalSign();
                } else {
                }
            });
    }

    saveMedication() {
        const medications = this.state.medications;
        const medication = this.state.medication;
        medication.id = medications.length;
        medications.push(this.state.medication);
        this.setState({ medications: medications});
        $('#myModalMedication').modal('hide');
    }

    handleChange(e) {
        const { name, value } = e.target;
        const vital = this.state.vitalSign;
        vital[name] = value;
        this.setState({ vitalSign: vital });
    }

    handleMedicationChange(e) {
        const { name, value } = e.target;
        const medication = this.state.medication;
        medication[name] = value;
        this.setState({ medication: medication });
    }

    render() {
        const { user, users } = this.props;
        let ele;
        if (this.state.isLoggedOut) {
            ele = <LoginPage isLoggedOut={true} />
        }
        else {
            ele = (

                <div className="">
                    <div className="container-fluid">
                        <div className='row'>
                            <button className="pull-right btn btn-primary" onClick={this.logout}>Logout</button>
                        </div>
                        <div className="row">
                            <div className="jumbotron col-md-12">
                                <div className=''>
                                    Vital Signs
                                    <button className='btn btn-primary pull-right' onClick={this.addVitalSign}>Add Vital Sign</button>
                                </div>
                                <div className='table-responsive-sm'>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Start Date</th>
                                                <th scope="col">Frequency</th>
                                                {/* <th scope='col'>Actions</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.vitalSigns.map((vitalSign) => {
                                                return (
                                                    <tr>
                                                        <td>{vitalSign.id}</td>
                                                        <td>{vitalSign.name}</td>
                                                        <td>03-24-2022</td>
                                                        {/* <td>{vitalSign.startDate}</td> */}
                                                        {/* <td>{vitalSign.frequency}</td> */}
                                                        <td>Dialy</td>
                                                        {/* <td><button onClick={this.deleteVitalSign(vitalSign.id)}>Delete</button></td> */}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="jumbotron col-md-12">
                                <div className=''>
                                    Medication
                                    <button className='btn btn-primary pull-right' onClick={this.addMedication}>Add Medication</button>
                                </div>

                                <div className='table-responsive-sm'>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Start Date</th>
                                                <th scope="col">Dosage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.medications.map((item) => {
                                                return (
                                                    <tr>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.startDate}</td>
                                                        <td>200 mg</td>
                                                        {/* <td>{item.dosage}</td> */}
                                                        {/* <td><button onClick={this.deleteVitalSign(vitalSign.id)}>Delete</button></td> */}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div id='myModal' className="modal" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add Vital Sign</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input type="text" value={this.state.vitalSign.name} onChange={this.handleChange} className="form-control" name="name" placeholder="Enter name of the Vital Sign" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="startDate">Start Date</label>
                                                <input type="date" value={this.state.vitalSign.startDate} onChange={this.handleChange} className="form-control" name="startDate" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="frequencyPerWeek">Frequency per week</label>
                                                <select value={this.state.vitalSign.frequencyPerWeek} onChange={this.handleChange} name='frequencyPerWeek' className="form-control custom-select">
                                                    <option>Open this select menu</option>
                                                    <option value="1">Dialy</option>
                                                    <option value="2">Weekly</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="frequencyPerDay">Frequency per day</label>
                                                <select name='frequencyPerDay' value={this.state.vitalSign.frequencyPerDay} onChange={this.handleChange} className="form-control custom-select">
                                                    <option>Open this select menu</option>
                                                    <option value="1">Once</option>
                                                    <option value="2">Twice</option>
                                                    <option value="2">Thrise</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="time">Time</label>
                                                <input type="text" value={this.state.vitalSign.time} onChange={this.handleChange} className="form-control" name="time" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="metric">Metric</label>
                                                <input type="text" value={this.state.vitalSign.metric} onChange={this.handleChange} className="form-control" name="metric" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={this.saveVitalSign}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div id='myModalMedication' className="modal" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add Medication</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" value={this.state.medication.name} onChange={this.handleMedicationChange} className="form-control" name="name" placeholder="Enter name of the Medication" />
                                            </div>
                                            <div className="form-group">
                                                <label>Start Date</label>
                                                <input type="date" value={this.state.medication.startDate} onChange={this.handleMedicationChange} className="form-control" name="startDate" />
                                            </div>
                                            <div className="form-group">
                                                <label>Frequency per week</label>
                                                <select value={this.state.medication.frequencyPerWeek} onChange={this.handleMedicationChange} name='frequencyPerWeek' className="form-control custom-select">
                                                    <option>Open this select menu</option>
                                                    <option value="1">Dialy</option>
                                                    <option value="2">Weekly</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Frequency per day</label>
                                                <select name='frequencyPerDay' value={this.state.medication.frequencyPerDay} onChange={this.handleMedicationChange} className="form-control custom-select">
                                                    <option>Open this select menu</option>
                                                    <option value="1">Once</option>
                                                    <option value="2">Twice</option>
                                                    <option value="2">Thrise</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Dosage</label>
                                                <input type="text" value={this.state.medication.dosage} onChange={this.handleMedicationChange} className="form-control" name="dosage" />
                                            </div>
                                            <div className="form-group">
                                                <label>Time</label>
                                                <input type="text" value={this.state.medication.time} onChange={this.handleMedicationChange} className="form-control" name="time" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={this.saveMedication}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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