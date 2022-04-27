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

    render() {
        return (<div>
            <Editor
                apiKey='cr62hirykwu7p2ybs9eypp9qzdbxumxo3qy9v1kq6y6zyxcm'
                value={this.state.convertedText}
                init={{
                    height: 500,
                    menubar: false
                }}
                onEditorChange={this.handleChange}
            />
            <button onClick={this.sendEmail}>Send</button>
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