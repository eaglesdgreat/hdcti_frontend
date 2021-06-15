import React from 'react'
import {
  Typography,
  Box,
  Button,
  MenuItem,
  Menu,
} from '@material-ui/core'
import { Cached } from '@material-ui/icons';

export default function Switch(props) {

  const {
    content,
    contentSize,
    platform,
    anchorEl,
    handleClick,
    handlePlatformClose,
    selectedFilterIndex,
    handleFilterSelect,
    background
  } = props

  return (
    <Box style={{
      width: "27%"
    }}>
      <Button style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "6px",
        width: "7rem",
        marginLeft: "1.5rem"
      }}
        size="large"
        className={background}
        disableRipple
        onClick={handleClick}
      >
        {content === "SWITCH TO" &&
          <Cached style={{ fontSize: "0.9rem", color: "#FF5C00", marginRight: "0.3rem" }} />
        }
        <Typography style={{ fontWeight: 500, color: "#FF5C00" }}
          className={contentSize}
        >
          {content}
        </Typography>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handlePlatformClose}
        PaperProps={{
          style: {
            borderRadius: '8px',
            margin: '72px 0px 0px -25px',
            boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.08)',
            backgroundColor: '#FFFFFF',
            width: '160px',
            height: '180px',
            paddingTop: '2%',
            paddingBottom: '1%',
            // paddingLeft: '1%',
          }
        }}
      >
        <MenuItem
          disabled
        >
          <Typography
            style={{
              fontWeight: '400',
              fontSize: '15px',
              lineHeight: '17.58px',
              color: '#242120',
            }}
          >
            Switch User Type
            </Typography>
        </MenuItem>
        {platform.map((item, index) => (
          <MenuItem
            key={index}
            selected={index === selectedFilterIndex}
            onClick={() => handleFilterSelect(item.name, index)}
          >
            <Typography
              style={{
                fontWeight: '400',
                fontSize: '15px',
                lineHeight: '17.58px',
                color: '#242120',
              }}
            >
              {item.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
} 