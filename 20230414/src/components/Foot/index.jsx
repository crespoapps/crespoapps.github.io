import React from 'react'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'

const Foot = () => (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Typography
            sx={{
                textAlign: 'center',
                fontFamily: 'monospace'
            }}
        >
            Crespo Apps &copy;{(new Date()).getFullYear()}
        </Typography>
    </AppBar>
)

export default Foot