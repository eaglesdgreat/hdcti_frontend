import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { makeStyles } from '@material-ui/core/styles'
import {
  DateRangePicker
} from 'react-date-range';
import {
  Box, Grid, Tooltip, Zoom,
} from '@material-ui/core'
import {
  CalendarToday,
  ArrowBackIos,
  ArrowForwardIos,
} from '@material-ui/icons'
import { format } from 'date-fns'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#A7A6A6",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    background: "#FFFFFF",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.05)",
    marginRight: "0.4rem",
    height: "2.7rem",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out 0s",
    '&:hover': {
      background: "rgba(0, 0, 0, 0.05)",
    }
  },
  toolTipWidth: {
    maxWidth: 180,
  },
}));

const DatePicker = ({
  startDate,
  endDate,
  handleSelect,
  handleCurrentStatus
}) => {
  const classes = useStyles();
  const [showDatePicker, setShowDatePicker] = useState(false)

  const formattedStartDate = format(startDate, 'MMMM dd, yyyy')
  const formattedEndDate = format(endDate, 'MMMM dd, yyyy')

  const showDatePickerHandler = () => {
    setShowDatePicker(!showDatePicker)
  }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  return (
    <Grid container style={{ position: "relative" }}>
      <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
        <Box
          style={{
            opacity: 0.8,
            paddingLeft: "0.4rem",
            paddingRight: "0.2rem",
          }}
          onClick={showDatePickerHandler}
          className={classes.button}
        >
          <ArrowBackIos style={{ fontSize: "1rem", }} />
        </Box>
      </Grid>

      <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
        <Box
          className={classes.button}
          onClick={showDatePickerHandler}
          style={{
            opacity: 0.8,
            color: "#242120",
            paddingLeft: "0.6rem",
            paddingRight: "0.6rem",
          }}
        >
          <CalendarToday style={{
            fontSize: "1rem",
            color: "#A7A6A6",
            opacity: 0.8,
            marginRight: "0.4rem"
          }} /> {formattedStartDate} - {formattedEndDate}
        </Box>
      </Grid>

      <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
        <Box
          style={{
            opacity: 0.8,
            paddingLeft: "0.4rem",
            paddingRight: "0.2rem",
          }}
          onClick={showDatePickerHandler}
          className={classes.button}
        >
          <ArrowForwardIos style={{ fontSize: "1rem" }} />
        </Box>
      </Grid>

      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
        <Tooltip placement="bottom-start" TransitionComponent={Zoom}
          title="Resets the date picker to reflect the current month"
          arrow classes={{ tooltip: classes.toolTipWidth }}
        >
          <Box
            className={classes.button}
            onClick={handleCurrentStatus}
            style={{
              opacity: 0.8, color: "#242120",
              paddingLeft: "0.4rem",
              paddingRight: "0.4rem",
            }}
          >
            Current Stats
        </Box>
        </Tooltip>
      </Grid>

      <Box style={{ position: "absolute", zIndex: 20, top: "3rem" }}>
        {showDatePicker &&
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
          />}
      </Box>
    </Grid>
  )
}

export default DatePicker;