import React from 'react'
import { Container } from '@material-ui/core'
import { CarsPage } from './pages/cars'
import useWindowSize from './hooks/useWindowSize'

function App() {

  const { width } = useWindowSize()

  return (
    <Container maxWidth='xl' style={{ maxWidth: width }}>
      <CarsPage />
    </Container>
  )
}

export default App
