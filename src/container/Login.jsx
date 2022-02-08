import { Box, Button } from '@mui/material'
import React, { useContext } from 'react'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import GoogleIcon from '@mui/icons-material/Google'

import { AuthContext } from '../context/AuthContext'
const Login = () => {
    const { signinWithGoogle, signinWithFacebook } = useContext(AuthContext)
    const style = {
        container: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        box: {
            borderRadius: 10,
            width: '40%',
            padding: '2rem',
            backgroundColor: '#ccc',
        },
    }

    return (
        <Box sx={style.container}>
            <Box>
                <Button
                    variant="container"
                    startIcon={<FacebookOutlinedIcon />}
                    color="primary"
                    sx={{ marginBottom: '1rem' }}
                    onClick={signinWithFacebook}
                >
                    Login with Facebook
                </Button>
                <Box />
                <Button
                    onClick={signinWithGoogle}
                    startIcon={<GoogleIcon />}
                    variant="container"
                >
                    Login with Google
                </Button>
            </Box>
        </Box>
    )
}

export default Login
