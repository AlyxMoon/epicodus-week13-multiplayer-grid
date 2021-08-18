import * as React from 'react';
import { connect } from 'react-redux';

import { ApplicationState } from '../store';
import * as AuthStore from '../store/Auth';

type RegisterProps =
  AuthStore.AuthState
  & typeof AuthStore.actionCreators

class Register extends React.PureComponent<RegisterProps> {
  public state = {
    userName: '',
    email: '',
    password: '',
  }

  private handleInputChange = (
    name: 'userName' | 'email' | 'password',
    event: React.FormEvent<HTMLInputElement>,
  ): void => {
    this.setState({ [name]: event.currentTarget.value })
  }

  private handleSubmit (event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    this.props.register(this.state)
  }

  public render() {
    return (
      <React.Fragment>
        <h1>Register Form</h1>

        <form onSubmit={e => this.handleSubmit(e)}>
          <label className="form-label">Username</label>
          <input 
            type="text" 
            className="form-control"
            value={this.state.userName} 
            onChange={event => this.handleInputChange('userName', event)}
          ></input>

          <label className="form-label">Email</label>
          <input 
            type="email"  
            className="form-control"
            value={this.state.email} 
            onChange={event => this.handleInputChange('email', event)}
          ></input>

          <label className="form-label">Password</label>
          <input 
            type="password"  
            className="form-control"
            value={this.state.password} 
            onChange={event => this.handleInputChange('password', event)}
          ></input>

          <div className="validation-container">
            {this.props.errors.length}
            <ul>
              {this.props.errors.map(error => (
                <li key={error.code}>
                  {error.code}: {error.description}
                </li>
              ))}
            </ul>
          </div>

          <button className="mt-2 btn btn-primary">Submit</button>
        </form>

        {this.props.user && (
          <div>You have been logged in, yay! {this.props.user.userName}</div>
        )}
      </React.Fragment>
    );
  }
};

export default connect(
  (state: ApplicationState) => state.auth,
  AuthStore.actionCreators,
)(Register as any);
