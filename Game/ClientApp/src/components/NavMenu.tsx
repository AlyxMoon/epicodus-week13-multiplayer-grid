import * as React from 'react'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { ApplicationState } from '../store'
import * as AuthStore from '../store/Auth'

import './NavMenu.css'

type Props = AuthStore.AuthState & typeof AuthStore.actionCreators

class NavMenu extends React.PureComponent<Props> {
  public state = {
    isOpen: false,
  };

  public render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Game</NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="mr-2"/>
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                </NavItem>

                {!this.props.user && (
                  <React.Fragment>
                    <NavItem>
                      <NavLink tag={Link} className="btn text-dark" to="/register">Register</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="btn text-dark" to="/login">Login</NavLink>
                    </NavItem>
                  </React.Fragment>
                )}

                {this.props.user && (
                  <React.Fragment>
                    <NavItem>
                      {this.props.user && (
                        <span className="nav-text">
                          {this.props.user.userName}
                        </span>
                      )}
                    </NavItem>
                    <NavItem>
                      <button 
                        className="btn nav-link text-dark"
                        onClick={this.props.logout}
                      >Logout</button>
                    </NavItem>
                  </React.Fragment>
                )}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    )
  }

  private toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
}

export default connect(
  (state: ApplicationState) => state.auth,
  AuthStore.actionCreators,
)(NavMenu as any)
