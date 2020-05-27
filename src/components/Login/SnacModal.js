import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authentication';

import classnames from 'classnames';

class SnacModal extends Component {

	constructor() {
		super();
		this.state = {
			wallet_id: '',
			password: '',
			errors: {}
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();
	}

	render() {
		const {errors} = this.state;
		return(
			<div className="modal fade modalStyle show" id="modalForm2" style={{display:"block"}} aria-modal="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>

                        <div className="modal-body">
                            <form className="formStyle text-center">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group mb-3">
                                            <label>SNAC ID</label>
                                            <input type="text" placeholder=""/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="text" placeholder=""/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mb-0">
                                            <button type="button" className="btn snacBtn">Log in</button>
                                        </div>
                                    </div>
                                    
                                </div>					
                            </form>
                        </div>
                    </div>
                </div>
            </div>
		)
	}
}

SnacModal.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(SnacModal)