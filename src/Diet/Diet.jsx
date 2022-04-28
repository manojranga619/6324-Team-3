import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { userActions } from '../_actions';
const date = new Date();
const styles = {
    notesList: {
        display: "grid",
        gridGap: "1rem",
        gridTemplateColumns: `repeat(
			auto-fill,
			minmax(250px, 1fr)
		)`
    },
    note: {
        backgroundColor: `rgb(53 215 220)`,
        borderRadius: "10px",
        padding: "1rem",
        minHeight: "170px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        whiteSpace: "pre-wrap"
    }
}


class DietPlanPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dietPlans: [],
            dietText: ''
        };
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getDietPlans();
    }

    getDietPlans() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedInUser.accessToken },
        };
        fetch('http://150.158.142.171:8080/api/diet', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ dietPlans: data.data });
            });
    }
    deleteDietPlan(dietPlan) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedInUser.accessToken },
        };
        fetch('http://150.158.142.171:8080/api/diet/' + dietPlan.id, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.getDietPlans()
            });
    };

    render() {
        return (
            <div style={{ backgroundImage: `url(${'src/20043.png'})`, height: '710px' }}>
                <h1 style={{ paddingLeft: '500px', fontWeight: 'bold' }}>Public Health Monitoring System</h1>
                <Link to="/home" className="btn btn-info">Back</Link>
                <h2 style={{ textAlign: "center" }}>Diet Plan</h2>
                <div style={{ padding: "15px" }}>
                    <div style={{ display: "grid", gridGap: "1rem", gridTemplateColumns: styles.notesList.gridTemplateColumns }}>
                        {this.state.dietPlans.map((dietPlan, i) => {
                            return (
                                <div id={i} style={{ backgroundColor: `rgb(53 215 220)`, borderRadius: "10px", padding: "1rem", minHeight: "170px", display: "flex", flexDirection: "column", justifyContent: "space-between", whiteSpace: "pre-wrap" }}>
                                    <span>{dietPlan.plan}</span>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "5px" }}>
                                        <small>{date.toLocaleDateString()}</small>
                                        <button className='btn btn-danger' onClick={() => this.deleteDietPlan(dietPlan)}>Delete</button>
                                    </div>
                                </div>
                            );
                        })}
                        <div style={{ backgroundColor: styles.note.backgroundColor, borderRadius: styles.note.borderRadius, padding: styles.note.padding, minHeight: styles.note.minHeight, display: styles.note.display, flexDirection: styles.note.flexDirection, justifyContent: styles.note.justifyContent, whiteSpace: styles.note.whiteSpace }}>
                            <textarea
                                rows='8'
                                cols='10'
                                placeholder='Type to add a diet plan...'
                                value={this.state.dietText}
                                onChange={this.handleChange}
                            ></textarea>
                            <div style={{ disply: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "5px" }}>
                                <button className='btn btn-primary' onClick={this.handleAddClick.bind(this)}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



    handleAddClick() {
        const postObj = {
            id: this.state.dietPlans.length + 1,
            plan: this.state.dietText,
            height: "1.7",
            weight: "70"
		};
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedInUser.accessToken },
            body: JSON.stringify(postObj)
        };
        fetch('http://150.158.142.171:8080/api/diet', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    this.getDietPlans();
                    this.setState({dietText: ''})
                } else {
                }
            });
    };
    handleChange(event) {
        this.setState({ dietText: event.target.value });
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

const connectedDietPlanPage = connect(mapState, actionCreators)(DietPlanPage);
export { connectedDietPlanPage as DietPlanPage };