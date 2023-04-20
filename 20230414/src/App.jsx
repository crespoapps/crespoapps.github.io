import React from 'react'
import Head from './components/Head'
import Body from './components/Body'
import Foot from './components/Foot'
import { redirect } from 'react-router-dom'

const AppContent = () => (
  <>
    <Head />
    <Body />
    <Foot />
  </>
)

const App = ({ start }) => {
  if (!start) {
    return <AppContent />
  }

  redirect(`/${start.substring(0, start.length - 1)}`)
  return null
}
export default App
