import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'
import BiotechIcon from '@mui/icons-material/Biotech'
import SavingsIcon from '@mui/icons-material/Savings'
import ScienceIcon from '@mui/icons-material/Science'
import { Link } from 'react-router-dom'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const getPath = (page) => {
    switch (page) {
        case 'Keyz': return '/tools/strong-password-generator'
        case 'Linx': return '/links'
        case 'Vidz': return '/videos'
        default: return null
    }
}

const StyledLink = styled(Link)(({ theme }) => ({
    color: 'White',
    textDecoration: 'none'
}))

const SiteIcon = ({ sx }) => ({
    '0': <AllInclusiveIcon sx={sx} />,
    '1': <BiotechIcon sx={sx} />,
    '2': <SavingsIcon sx={sx} />,
    '3': <ScienceIcon sx={sx} />,
})['' + ((new Date()).getSeconds() % 4)]


const HeadLink = ({ page }) => (
    <StyledLink to={getPath(page)}>
        {page}
    </StyledLink>)

const Head = () => {
    const pages = ['Keyz', 'Linx', 'Vidz']

    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <SiteIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <StyledLink to="/">
                            Crespo Apps
                        </StyledLink>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page}>
                                    <Typography textAlign="center">
                                        <HeadLink page={page} />
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <SiteIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <StyledLink to="/">
                            Crespo Apps
                        </StyledLink>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}

                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <HeadLink page={page} />
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

/*
const mapStateToProps = (state, ownProps) => ({
    // ... computed data from state and optionally ownProps
})

const mapDispatchToProps = {
    // ... normally is an object full of action creators
}
  // `connect` returns a new function that accepts the component to wrap:
  const connectToStore = connect(mapStateToProps, mapDispatchToProps)
  // and that function returns the connected, wrapper component:
  const ConnectedComponent = connectToStore(Component)
  
  // We normally do both in one step, like this:
  connect(mapStateToProps, mapDispatchToProps)(Head)
*/

export default Head
