import React, { useState } from 'react'
import { 
    Grid,
    TextField,
    InputAdornment,
    InputBase,
    FormControl,
    Select,
    Box,
    Typography,
    Menu,
    MenuItem,
    Button,
    Divider
} from '@material-ui/core'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search';



const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 6,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #EAEAEA',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: 'Roboto',
      '&:focus': {
        borderRadius: 4,
        borderColor: '#FF5C00',
        backgroundColor: theme.palette.background.paper,
      },
    },
  }))(InputBase);



const useStyles = makeStyles((theme) => ({
    typography: {
      fontfamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '24px',
      color: '#2F3237',
      lineHeight: '28px',
    }, 
    margin: {
        padding: 20,
        width: '358px',
        paddingLeft: 30,
    },
    button: {
        '&:hover,&:focus': {
            backgroundColor: '#ffffff00',
        },
    },
  }))



export default function NoPending(props) {
    const classes = useStyles()
    const { name } = props

    return (
      <Box
        display="flex"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          style={{
              margin: 'auto',
              paddingTop: '9%',
              paddingBottom: '11%',
          }}
        >
          <img src="/Ellipse22.svg" alt="circle" />
          <Typography
              className={classes.typography}
              style={{
                  textAlign: 'center',
                  marginTop: '20px'
              }}
              >
              There are no pending {name.toLowerCase()}
              {/* There are no pending products */}
          </Typography>

          <Typography
          className={classes.typography}
          style={{
              textAlign: 'center',
              fontWeight: 'normal',
              fontSize: '16px',
              lineHeight: '19px',
              marginTop: '10px'
          }}
          >
            You will be notified when {name.toLowerCase()}<br/> are created for approval
            {/* You will be notified when products<br/> are created for approval */}
          </Typography>
        </Box>
      </Box>
    )
}