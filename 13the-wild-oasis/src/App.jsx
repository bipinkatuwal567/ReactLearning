import React from 'react'
import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import Button from './ui/Button'
import Input from './ui/Input'

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 800;
  color: red;
`

const StyledApp = styled.div`
  background-color: orange;
`

export default function App() {
  return (
    <>
    <GlobalStyles />
    <StyledApp>
      <H1>Hello World!</H1>
      <Button onClick={() => alert("Checked in")}>Check in</Button>
      <Button onClick={() => alert("Checked out")}>Check out</Button>
      <Input type='number' placeholder='Guest Number' />
    </StyledApp>
    </>
  )
}
