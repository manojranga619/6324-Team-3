import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class BMIPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feet: 0,
            inch: 0,
            weight: 0,
            bmi: 0
        };
        this.handleBmiChange = this.handleBmiChange.bind(this);
        this.calculateBMI = this.calculateBMI.bind(this);
    }

    handleBmiChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    calculateBMI() {
        const height = (Number(this.state.feet) * 12) + Number(this.state.inch);
        let bmi = Number(this.state.weight) / (height * height);
        bmi = 703 * bmi;
        this.setState({ bmi: bmi });
    }

    render() {
        return (<div>
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="col-md-6 col-md-offset-3">
                            <h2>BMI Calculator</h2>
                            <div className='form-group'>
                                <div className='row'>
                                    <label>Height</label>
                                    <div className='row'>
                                        <div className='col-md-5'>
                                            <label>Feet</label>
                                            <input type="number" className='form-control' name="feet" onChange={this.handleBmiChange} value={this.state.feet} />
                                        </div>
                                        <div className='col-md-5'>
                                            <label>Inches</label>
                                            <input type="number" className='form-control' name="inch" onChange={this.handleBmiChange} value={this.state.inch} />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <label>Weight</label>
                                    <input type="number" className='form-control' name="weight" onChange={this.handleBmiChange} value={this.state.weight} />
                                </div>
                                <div className='row' style={{marginTop: "10px"}}>
                                    <button className='btn btn-info' onClick={this.calculateBMI}>Calculate</button>
                                    <label style={{ paddingLeft: "20px" }}>BMI:</label> <span>{this.state.bmi}</span>
                                </div>
                            </div>
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

const connectedBMIPage = connect(mapState, actionCreators)(BMIPage);
export { connectedBMIPage as BMIPage };