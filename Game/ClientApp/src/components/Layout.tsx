import * as React from 'react'
import { Container } from 'reactstrap'
import NavMenu from './NavMenu'

type Props = {
  children?: React.ReactNode
}

export default class Layout extends React.PureComponent<Props> {
  public render () {
    return (
      <React.Fragment>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </React.Fragment>
    )
  }
}