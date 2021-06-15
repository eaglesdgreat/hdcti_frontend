import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import TableLayout from '../../../Components/Tables'
import {
  Typography,
  Box,
  Select,
  FormControl,
  MenuItem,
  InputBase,
  Button,
  Menu
} from '@material-ui/core'
import {
  ArrowBackIos,
} from '@material-ui/icons';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Line } from 'react-chartjs-2'



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: "wrap",
    // flexDirection: "column",
    margin: "1.5rem 1rem 1rem 1.3rem",
    // padding: " 1.5rem 3rem 4rem 1.3rem",
    height: "75%"
  },
  title: {
    fontSize: "0.875rem",
    color: "#6A6A6A",
  },
  button: {
    width: "5rem"
  }
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: "5px",
    position: 'relative',
    backgroundColor: "FFFFFF",
    fontSize: "0.9rem",
    padding: '0 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#FFFFFF',
      boxShadow: '0 0 0 0.2rem rgba(0, 0, 0, 0.05)',
    },
  },
}))(InputBase);

export default function Chart({ data, onYearlyChange }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);

  const filterItems = [
    { name: 'Months', value: '2020' },
    { name: 'January', value: '2020' },
    { name: 'February', value: '2020' },
    { name: 'March', value: '2020' },
    { name: 'April', value: '2020' },
    { name: 'May', value: '2020' },
    { name: 'June', value: '2020' },
    { name: 'July', value: '2020' },
    { name: 'August', value: '2020' },
    { name: 'September', value: '2020' },
    { name: 'October', value: '2020' },
    { name: 'November', value: '2020' },
    { name: 'December', value: '2020' },
  ]

  const handleClickFilterItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  }

  const handleFilterSelect = (event, index) => {
    setSelectedFilterIndex(index);
    setAnchorEl(null);
  };

  const setGradientColor = (canvas, color) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 300, 250);
    gradient.addColorStop(0.85, "rgba(255, 92, 0, 0.1)");
    gradient.addColorStop(0.2, color);
    return gradient
  }

  const getchartData = (canvas) => {
    const chartData = data;
    if (chartData.datasets) {
      let colors = ["#FFFFFF", "rgba(255, 92, 0, 0.2)", "rgba(255, 92, 0, 0)"];
      chartData.datasets.map((set, i) => {
        set.backgroundColor = setGradientColor(canvas, colors[i]);
        set.borderColor = "#FF5C00";
        set.borderWidth = 1;

      })
    }
    return data;
  }

  return (
    <Box className={classes.root}>
      <Box style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}>
        <span>
          <Typography style={{ fontSize: "0.8rem", color: "#6A6A6A" }}>
            SALES PERFORMANCE
          </Typography>
        </span>

        <Box style={{
          width: "50%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}>
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
              margin: 'auto',
              margin: 0,
            }}
          >
            <Typography
              style={{
                fontSize: '15px',
                fontWeight: 'normal',
                linHeight: '18px',
                color: '#272643',
                marginLeft: '10px'
              }}
            >
              {filterItems[selectedFilterIndex].name}
            </Typography>

            <Button disableRipple aria-controls="simple-menu" style={{ marginLeft: '-17px' }}
              className={classes.button} aria-haspopup="true" onClick={handleClickFilterItem}
            >
              <img src="/Vector.svg" alt="menu" />
            </Button>
          </Box>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
            PaperProps={{
              style: {
                borderRadius: '8px',
                margin: '31px 0px 0px -20px',
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
            {filterItems.map((item, index) => (
              <MenuItem
                key={index}
                selected={index === selectedFilterIndex}
                onClick={(event) => {
                  // const month = item.name
                  const year = item.value
                  handleFilterSelect(event, index)
                  onYearlyChange(year)
                }}
              >
                <Typography
                  className={classes.typography}
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
      </Box>
      
      <Box style={{
        position: "relative",
        width: 410,
        height: 195
      }}>
        <Line
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                gridLines: {
                  // drawBorder: false,
                  drawOnChartArea: false
                }
              }],
              yAxes: [{
                gridLines: {
                  // display: false,
                  drawBorder: false,
                  drawOnChartArea: true
                },
                ticks: {
                  padding: 1
                }
              }]
            }
          }}
          data={getchartData}
        />
      </Box>
    </Box>
  )
}