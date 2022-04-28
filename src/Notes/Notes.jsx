import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
		backgroundColor: "#fef68a",
		borderRadius: "10px",
		padding: "1rem",
		minHeight: "170px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		whiteSpace: "pre-wrap"
	}
}


class NotesPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			notes: [],
			noteText: ''
		};
		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getNotes();
	}

	render() {
		return (
			<div style={{ backgroundImage: `url(${'src/20043.png'})`, height: '710px', backgroundSize: 'contain' }}>
				<h1 style={{ paddingLeft: '500px', fontWeight: 'bold' }}>Public Health Monitoring System</h1>
				<Link to="/home" className="btn btn-info">Back</Link>
				<h2 style={{ textAlign: "center" }}>Notes</h2>
				<div style={{ padding: "15px" }}>
					<div style={{ display: "grid", gridGap: "1rem", gridTemplateColumns: styles.notesList.gridTemplateColumns }}>
						{this.state.notes.map((note, i) => {
							return (
								<div id={i} style={{ backgroundColor: "#fef68a", borderRadius: "10px", padding: "1rem", minHeight: "170px", display: "flex", flexDirection: "column", justifyContent: "space-between", whiteSpace: "pre-wrap" }}>
									<span>{note.note}</span>
									<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "5px" }}>
										<small>{date.toLocaleDateString()}</small>
										<button className='btn btn-danger' onClick={() => this.deleteNote(note)}>Delete</button>
									</div>
								</div>
							);
						})}
						<div style={{ backgroundColor: styles.note.backgroundColor, borderRadius: styles.note.borderRadius, padding: styles.note.padding, minHeight: styles.note.minHeight, display: styles.note.display, flexDirection: styles.note.flexDirection, justifyContent: styles.note.justifyContent, whiteSpace: styles.note.whiteSpace }}>
							<textarea
								rows='8'
								cols='10'
								placeholder='Type to add a note...'
								value={this.state.noteText}
								onChange={this.handleChange}
							></textarea>
							<div style={{ disply: "flex", alignItems: "center", justifyContent: "space-between" }}>
								<button style={{ marginTop: "5px" }} className='btn btn-primary' onClick={this.handleAddClick.bind(this)}>
									Add
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	getNotes() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedInUser.accessToken },
        };
        fetch('http://150.158.142.171:8080/api/notes', requestOptions)
            .then(response => response.json())
            .then(data => {
				this.setState({ notes: data.data });
            });
    }

	deleteNote(note) {
		const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedInUser.accessToken },
        };
        fetch('http://150.158.142.171:8080/api/notes/' + note.id, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.getNotes();
            });
	};

	handleAddClick() {
		const postObj = {
			
			notes: this.state.noteText
		};
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedInUser.accessToken },
            body: JSON.stringify(postObj)
        };
        fetch('http://150.158.142.171:8080/api/notes', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    this.getNotes();
					this.setState({noteText: ''})
                } else {
                }
            });
	};
	handleChange(event) {
		this.setState({ noteText: event.target.value });
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

const connectedNotesPage = connect(mapState, actionCreators)(NotesPage);
export { connectedNotesPage as NotesPage };