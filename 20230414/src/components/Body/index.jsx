import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Keyz from './Keyz'
import Linx from './Linx'
import Vidz from './Vidz'

const Home = () => <div>Hi</div>

const Body = () => (
    <Routes>
        <Route index element={<Home />} />
        <Route path="/tools/strong-password-generator" element={<Keyz />} />
        <Route path="/links" element={<Linx />} />
        <Route path="/videos" element={<Vidz />} />

        {/* Using path="*"" means "match anything", so this route
        acts like a catch-all for URLs that we don't have explicit
        routes for. */}
        <Route path="*" element={<Home />} />
    </Routes>
)

export default Body