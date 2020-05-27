import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, loginKakaoUser } from '../../actions/authentication';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

class MainPage extends Component {

	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {},
			kakaoModal: false,
			snacModal: false
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.kakaoBtnClick = this.kakaoBtnClick.bind(this);
		this.snacBtnClick = this.snacBtnClick.bind(this);
		this.signUpBtnClick = this.signUpBtnClick.bind(this);
	}

	signUpBtnClick() {
		this.props.history.push('/register');
	}

	kakaoBtnClick() {

		console.log("Kakao");
		this.props.loginKakaoUser();
	}

	snacBtnClick() {
		this.setState({
			snacModal: !this.state.snacModal
		});
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("OKOK");
		console.log(e.target);
		const user = {
			email: this.state.email,
			password: this.state.password,
		}
		console.log(user);
		this.props.loginUser(user);
	}

	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.auth.isAuthenticated) {
			this.props.history.push('/')
		}
		if(nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	render() {
		const {errors, kakaoModal, snacModal} = this.state;
		return(
			<div>
				<div
					className={classnames({modal:true, fade:true, modalStyle:true, show:kakaoModal})}
					id="modalForm1"
					style={{display:kakaoModal ? 'block': "none"}}
					aria-modal={{display:kakaoModal}}
				>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								onClick={this.kakaoBtnClick}
							>
								&times;
							</button>
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
												<button type="button" className="btn talkBtn">Log in</button>
											</div>
										</div>

									</div>
								</form>
							</div>
						</div>
					</div>
				</div>

				<div
					className={classnames({modal:true, fade:true, modalStyle:true, show:snacModal})}
					id="modalForm2"
					style={{display:snacModal ? 'block': "none"}}
					aria-modal={{display:snacModal}}
				>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								onClick={this.snacBtnClick}
							>
								&times;
							</button>

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
				<section className="loginSection">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<form className="formStyle text-center" onSubmit={ this.handleSubmit }>
									<div className="row">
										<div className="col-12">
											<div className="form-group">
												<label>Email</label>
												<input
													type="text"
													placeholder="Email"
													className={classnames('form-control form-control-lg', {
														'is-invalid': errors.email
													})}
													name="email"
													onChange={ this.handleInputChange }
													value={ this.state.email }
													/>
													{errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
											</div>
										</div>
										<div className="col-12">
											<div className="form-group">
												<label>Password</label>
												<input
													type="password"
													placeholder="Password"
													className={classnames('form-control form-control-lg', {
														'is-invalid': errors.password
													})}
													name="password"
													onChange={ this.handleInputChange }
													value={ this.state.password }
													/>
													{errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
											</div>
										</div>
										<div className="col-12">
											<div className="form-group">
												<button type="submit" className="btn mt-4 btn-primary">Log in</button>
											</div>
										</div>
										<div className="col-12">
											<div className="borderLine"></div>
										</div>
										<div className="col-12">
											<div className="form-group mt-3">
												<button
													type="button"
													className={classnames("btn", "talkBtn")}
													data-toggle="modal"
													data-target="#modalForm1"
													// onClick={this.kakaoBtnClick}
												>
													<a href = "/api/auth/loginKakao" > Log in with Kakao talk </a>
												</button>
											</div>
											{/* <div className="form-group">
												<button
													type="button"
													className="btn snacBtn"
													data-toggle="modal"
													data-target="#modalForm2"
													onClick={this.snacBtnClick}
												>
													Log in with SNAC
												</button>
											</div> */}
										</div>
										<div className="col-12">
											<div className="borderLine"></div>
										</div>
										<div className="col-12">
											<div className="linksGroup">
												<a href="#">아이디 / 비밀번호 찾기</a>
												<a href="#" onClick={this.signUpBtnClick}>회원가입</a>
											</div>
										</div>

									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="language">
						<a href="#"><img src="images/ic_lang.png"/> 언어 / Language</a>
					</div>
				</section>

				<div className={classnames({"modal-backdrop":kakaoModal || snacModal, fade:kakaoModal || snacModal, show:kakaoModal || snacModal})}></div>
			</div>
		)
	}
}

MainPage.propTypes = {
	loginUser: PropTypes.func.isRequired,
	loginKakaoUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(mapStateToProps, {
	loginUser,
	loginKakaoUser
})(withRouter(MainPage))
