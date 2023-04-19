import React, {useState}from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const pass = {
    rand: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    char: (min, max) => String.fromCharCode(pass.rand(min, max)),
    cap: () => pass.char(65, 90),
    low: () => pass.char(97, 122),
    num: () => pass.char(48, 57),
    gen: (size, symbols) => {
        var f = [pass.cap, pass.low, pass.num]
        if (symbols) {
            f.push(() => symbols[pass.rand(0, symbols.length - 1)])
        }
        var p = ''
        for (var i = 0; i < size; i++) {
            p += f[pass.rand(0, f.length - 1)]()
        }
        return p
    },
}

const defaultState = {
    size: '100',
    symbols: '~!@#$%+&-_=?',
    secret: ''
}

const generate = ({ size, symbols }) => pass.gen(Number(size) || Number(defaultState.size), symbols || defaultState.symbols)

const getInitialState = () => {
    let init = { ...defaultState }
    init.secret = generate(init)
    return init
}

const Keyz = () => {
    const [values, setValues] = useState(getInitialState())

    const handleChange = (prop) => (event) => {
        let updated = { ...values, [prop]: event.target.value }
        updated.secret = generate(updated)
        setValues(updated)
    }

    const resize = (size) => {
        let updated = { ...values, size }
        updated.secret = generate(updated)
        setValues(updated)
    }

    const regen = () => {
        setValues({ ...values, secret: generate(values) })
    }
    const copy = () => {
        var copyText = document.getElementById('pass-secret')
        copyText.select()
        copyText.setSelectionRange(0, 99999) /*For mobile devices*/
        document.execCommand('copy')
    }

    return (
        <Box sx={{ flexGrow: 1 , padding: '2em'}}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={1}>
                    <IconButton size="large" onClick={() => regen()}>
                        <VpnKeyIcon fontSize="inherit" />
                    </IconButton >
                </Grid>
                <Grid item xs={6} md={1}>
                    <IconButton onClick={() => copy()}>
                        <ContentCopyIcon fontSize="inherit" />
                    </IconButton >
                </Grid>
                <Grid item xs={12} md={3}>
                    <Chip label="32" variant="contained" onClick={() => resize('32')} />
                    <Chip label="50" variant="contained" onClick={() => resize('50')} />
                    <Chip label="64" variant="contained" onClick={() => resize('64')} />
                    <Chip label="75" variant="contained" onClick={() => resize('75')} />
                    <Chip label="100" variant="contained" onClick={() => resize('100')} />
                    <Chip label="128" variant="contained" onClick={() => resize('128')} />
                </Grid>
                <Grid item xs={6} md={2}>
                    <TextField
                        fullWidth
                        label="Size"
                        value={values.size}
                        placeholder={values.size}
                        onChange={handleChange('size')}
                    />
                </Grid>
                <Grid item xs={6} md={5}>
                    <TextField
                        fullWidth
                        label="Symbols"
                        value={values.symbols}
                        placeholder={values.symbols}
                        onChange={handleChange('symbols')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        id="pass-secret"
                        label="Secret"
                        value={values.secret}
                        placeholder={values.secret}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Keyz