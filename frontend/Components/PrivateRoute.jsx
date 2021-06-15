import React from 'react'
import { useRouter } from 'next/router'
import {
    Box,
    Typography,
    Button
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import { isAuthenticated } from './../lib/auth.helper'



const useStyles = makeStyles((theme) => ({
    typography: {
        fontfamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '24px',
        color: '#2F3237',
        lineHeight: '28px',
    },

    button: {
        '&:hover,&:focus': {
            backgroundColor: '#ffffff00',
        },
    },
}))



export default function PrivateRoute({ isError }) {
    const router = useRouter()
    const classes = useStyles()
    const token = isAuthenticated()
    // console.log(token === false)

    return (
        <Box
            display="flex"
            style={{
                margin: 'auto',
                paddingLeft: 100,
                paddingRight: 100,
                paddingTop: 140,
                paddingBottom: 140,
                // textAlign: 'center',
            }}
        >
            {
                isError &&
                (token === false
                    ? (
                        <Box
                            display="flex"
                            justifyContent="center"
                        // flexDirection="column"
                        >
                            <Typography
                                className={classes.typography}
                                style={{
                                    fontSize: '15px',
                                    lineHeight: '28px',
                                    color: '#252525',
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                }}
                            >
                                You need to login as admin to view admin dashboard.
                                Click the login button to login as admin
                            </Typography>
                        </Box>
                    )
                    : (
                        <Box
                            display="flex"
                            justifyContent="center"
                            style={{
                                margin: 'auto'
                            }}
                        >
                            <Typography
                                className={classes.typography}
                                style={{
                                    fontSize: '15px',
                                    lineHeight: '28px',
                                    color: '#252525',
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Something went wrong. Try again
                            </Typography>
                        </Box>
                    )
                )

            }
        </Box>
    )
}