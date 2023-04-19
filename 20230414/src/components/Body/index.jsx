import React from 'react'
import Keyz from './Keyz'
import Linx from './Linx'
import Vidz from './Vidz'

const Body = ({ page }) => {
    switch (page) {
        case 'Keyz': return <Keyz />
        case 'Linx': return <Linx />
        case 'Vidz': return <Vidz />
        default: return null
    }
}

export default Body