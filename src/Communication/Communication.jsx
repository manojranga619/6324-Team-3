import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Editor } from "@tinymce/tinymce-react";

class CommunicationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            convertedText: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendEmail = this.sendEmail.bind(this);

    }
    handleChange(txt) {
        this.setState({ convertedText: txt });
    }

    sendEmail() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedInUser.accessToken },
            body: JSON.stringify({
                message: this.state.convertedText
            })
        };
        fetch('http://150.158.142.171:8080/api/email', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    this.setState({ convertedText: '' });
                } else {
                }
            });
    }

    render() {
        return (<div style={{ backgroundImage: `url(${'src/20043.png'})`, height: '710px', backgroundSize: 'contain' }}>
            <h1 style={{ paddingLeft: '500px', fontWeight: 'bold' }}>Public Health Monitoring System</h1>
            <div style={{marginLeft: '250px'}}>
                <Editor
                    apiKey='cr62hirykwu7p2ybs9eypp9qzdbxumxo3qy9v1kq6y6zyxcm'
                    value={this.state.convertedText}
                    init={{
                        height: 500,
                        menubar: false,
                        width: 700
                    }}
                    onEditorChange={this.handleChange}
                />
            </div>
            <button className='btn btn-primary' style={{ margin: '10px', marginLeft: '250px', width: '160px' }} onClick={this.sendEmail}>Send to all Subsribers</button>
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

const connectedCommunicationPage = connect(mapState, actionCreators)(CommunicationPage);
export { connectedCommunicationPage as CommunicationPage };