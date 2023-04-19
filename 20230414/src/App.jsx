import React from 'react'
import { useState } from 'react'
import Head from './components/Head'
import Body from './components/Body'
import Foot from './components/Foot'

const App = () => {
  const pages = ['Keyz', 'Linx', 'Vidz']
  const [page, setPage] = useState(pages[0])
  const onPageChange = (page) => {
    setPage(page)
  }

  return (
    <>
      <Head pages={pages} onPageChange={onPageChange} />
      <Body page={page} />
      <Foot />
    </>
  )
}

export default App
