import React, { useContext, useRef, useReducer } from 'react'
import { Router, Link } from '@reach/router'
import {
  Container,
  Checkbox,
  Button,
  Flex,
  NavLink,
  Input,
  Label,
} from 'theme-ui'
import { gql, useMutation, useQuery } from '@apollo/client'
import { IdentityContext } from '../identity-context'

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`

const UPDATE_TODO_DONE = gql`
  mutation UpdateTodoDone($id: ID!) {
    updateTodoDone(id: $id) {
      text
      done
    }
  }
`

export default () => {
  const { user } = useContext(IdentityContext)
  const inputRef = useRef()
  const [addTodo] = useMutation(ADD_TODO)
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE)
  const {loading, error, data, refetch} = useQuery(GET_TODOS)

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
      <Flex
        as='form'
        onSubmit={async e => {
          e.preventDefault()
          await addTodo({ variables: { text: inputRef.current.value } })
          inputRef.current.value = ''
          refetch()
        }}
      >
        <Label sx={{ display: 'flex' }}>
          <span>Add&nbsp;Todo</span>
          <Input ref={inputRef} sx={{ marginLeft: 1 }} />
          <Button sx={{ marginLeft: 1 }}>Submit</Button>
        </Label>
      </Flex>
      <Flex sx={{ flexDirection: 'column' }}>
        <ul sx={{ listStyleType: 'none' }}>
          {loading ? <div>loading...</div> : null}
          {error ? <div>{error.message}</div> : null}
          {!loading && !error && data.todos.map(todo => (
            <Flex as='li' key={`todo-${todo.id}`}
              onClick={async () => {
                await updateTodoDone({ variables: {id: todo.id}})
                await refetch()
              }}
            >
              <Checkbox checked={todo.done} />
              <span>{todo.text}</span>
            </Flex>
          ))}
        </ul>
      </Flex>
    </Container>
  )
}