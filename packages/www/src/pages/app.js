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

let Dash = () => {
  const { user, identity } = useContext(IdentityContext)

  if (!user) {
    return <DashLoggedOut identity={identity} />
  }

  return (
    <Container>
      <Flex as='nav'>
        <NavLink as={Link} to='/' p={2}>Home</NavLink>
        <NavLink as={Link} to='/app' p={2}>Dashboard</NavLink>
        {user && (
          <NavLink href='#!' p={2}>
            {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
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