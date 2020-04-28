import React, { useContext } from 'react'
import { Router, Link } from '@reach/router'
import {
  Container,
  Heading,
  Button,
  Flex,
  NavLink,
} from 'theme-ui'
import { IdentityContext } from '../../identity-context'
import Dashboard from '../dashboard'

let Dash = () => {
  const { user, identity } = useContext(IdentityContext)

  if (!user) {
    return <DashLoggedOut identity={identity} />
  }

  return (
    <Dashboard/>
  )
}

let DashLoggedOut = ({ identity }) => {
  return (
    <Container>
      <Flex sx={{ flexDirection: 'column', padding: 3 }}>
        <Heading as='h1'>Get Stuff Done</Heading>
        <Button
          sx={{ marginTop: 2 }}
          onClick={() => {
            identity.open()
          }}
        >
          Log In
        </Button>
      </Flex>
    </Container>
  )
}

export default props => {
  return (
    <Router>
      <Dash path='/app' />
    </Router>
  )
}