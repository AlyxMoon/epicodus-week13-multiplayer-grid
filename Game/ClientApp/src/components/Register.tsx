import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { ApplicationState } from '../store';
import * as AuthStore from '../store/Auth';

class Register extends React.PureComponent {
  public state = {
    username: '',
    email: '',
    password: '',
  }

  private handleInputChange = (
    name: string,
    event: React.FormEvent<HTMLInputElement>,
  ): void => {
    this.setState({ [name]: event.currentTarget.value })
  }

  private handleSubmit (event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
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
            value={this.state.username} 
            onChange={event => this.handleInputChange('username', event)}
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

          <button className="mt-2 btn btn-primary">Submit</button>
        </form>
      </React.Fragment>
    );
  }
};

export default connect(
  (state: ApplicationState) => state.auth,
  AuthStore.actionCreators,
)(Register);
