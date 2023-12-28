
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEidtUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
        console.log('didmout edit modal ', this.props.currentUser)
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter: ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        //validate
        let isValid = this.checkValideInput();
        if (isValid === true) {
            //call api edit modal
            this.props.editUser(this.state,);
        }

    }

    render() {
     
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='modal-user-container'
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='innput-container'>
                            <label>Email</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                value={this.state.email}
                                disabled />
                        </div>
                        <div className='innput-container'>
                            <label>Password</label>
                            <input
                                type='password'
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                value={this.state.password}
                                disabled />
                        </div>
                        <div className='innput-container'>
                            <label>First name</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                value={this.state.firstName} />
                        </div>
                        <div className='innput-container'>
                            <label>Last name</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                value={this.state.lastName} />
                        </div>
                        <div className='innput-container max-width-input'>
                            <label>Address</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                value={this.state.address} />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEidtUser);



