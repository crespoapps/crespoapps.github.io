import React from 'react'
import Head from './components/Head'
import Body from './components/Body'
import Foot from './components/Foot'

const AppContent = () => (
  <>
    <Head />
    <Body />
    <Foot />
  </>
)

const App = () => <AppContent />

export default App
