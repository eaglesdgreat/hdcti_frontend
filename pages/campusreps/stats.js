import React, { useState } from 'react'
import {
  Typography,
  Box,
  Button,
  MenuItem,
  Menu,
  Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TableLayout from '../../Components/Tables'
import { Pie, Line } from 'react-chartjs-2'

// CSS Styles
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: "2.2rem 2.5rem 4rem 1.6rem",
  },
  title: {
    fontSize: "0.875rem",
    color: "#6A6A6A",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem 2rem 2rem 1.5rem",
    marginBottom: "1rem",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.05)",
  },
  boxRightBottomTitleContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pieChat: {
    marginTop: " 1rem",
    width: "100%"
  }
}))

const tableNav = [
  {
    active: true,
    label: 'stats',
    link: '/campusreps/stats',
  },
  {
    active: false,
    label: 'all reps',
    link: '/campusreps/allreps',
  },
  {
    active: false,
    label: 'req request',
    link: '/campusreps/reqrequest',
  },
]

const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: "Users",
      borderColor: '#FF5C00',
      pointStyle: 'star',
      data: [0, 10, 5, 2, 20, 30, 45]
    }
  ]
}

const pieData = {
  labels: ['Male', 'Female',],
  datasets: [
    {
      label: 'Points',
      backgroundColor: ['#521AEF', '#3A12A7'],
      data: [67, 32]
    }
  ]
}

export default function Stats() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);

  const filterItems = [
    { name: '2020' },
    { name: '2019' },
    { name: '2018' },
    { name: '2017' },
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

  return (
    <TableLayout tableNav={tableNav} name="Campus Reps">
      <Box className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12} sm={6} md={6} lg={6} xl={6}
                >
                  <Box className={classes.box}>
                    <Typography className={classes.title}>
                      ACTIVE REPS
                  </Typography>
                    <Box style={{ display: "flex" }}>
                      <Typography
                        style={{
                          fontSize: "2.1rem",
                          fontWeight: 500,
                          color: "#00A110",
                          marginRight: "0.5rem"
                        }}
                      >
                        922
                    </Typography>
                      <img src="/arrow-up.svg" alt="arrow-up" />
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12} sm={6} md={6} lg={6} xl={6}
                >
                  <Box
                    style={{ padding: "1.5rem 2rem 2.6rem 1.5rem", }}
                    className={classes.box}
                  >
                    <Typography className={classes.title}>
                      PENDING REPS
                  </Typography>
                    <Typography
                      style={{
                        fontSize: "1.7rem",
                        fontWeight: 500,
                        color: "#242120",
                      }}
                    >
                      129
                  </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box style={{ marginBottom: 0 }} className={classes.box}>
                <Box className={classes.boxRightBottomTitleContainer}>
                  <Typography className={classes.title}>
                    UNIVERSITIES
                    </Typography>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flexDirection: "row",
                      margin: 'auto',
                      paddingTop: 15,
                      paddingBottom: 15,
                      margin: 0,
                      paddingLeft: 0,
                    }}
                  >
                    <Typography
                      className={classes.typography}
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
                      }
                    }}
                  >
                    {filterItems.map((item, index) => (
                      <MenuItem
                        key={index}
                        selected={index === selectedFilterIndex}
                        onClick={(event) => handleFilterSelect(event, index)}
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
                <Box className={classes.salesChat}>
                  <Box style={{
                    position: "relative",
                  }}>
                    <Line
                      options={{
                        responsive: true
                      }}
                      data={lineData}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12} sm={12} md={4} lg={4} xl={4}
          >
            <Box
              style={{
                padding: "1.5rem 2rem 2.6rem 1.5rem",
                height: "100%",
              }}
              className={classes.box}
            >
              <Typography className={classes.title}>
                GENDER
              </Typography>
              <Box>
                <Box style={{
                  position: "relative",
                }}
                >
                  <Pie
                    data={pieData}
                    width={1}
                    options={{ maintainAspectRatio: false, responsive: true, }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </TableLayout>
  )
}