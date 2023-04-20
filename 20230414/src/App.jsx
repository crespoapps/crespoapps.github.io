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
  if (start) {
    redirect(`/${start}`)
  }
  return <AppContent />
}
export default App
