import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Box,
  MenuItem,
  InputBase,
  Button,
  Menu
} from '@material-ui/core'
import { Line } from 'react-chartjs-2'



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: "wrap",
    // flexDirection: "column",
    margin: "1.5rem 1rem 1rem 1.3rem",
    // padding: " 1.5rem 3rem 4rem 1.3rem",
    height: "100%"
  },
  title: {
    fontSize: "0.875rem",
    color: "#6A6A6A",
  },
  button: {
    width: "5rem"
  }
}));

export default function Chart({ data }) {
  const classes = useStyles();

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
        position: "relative",
        width: 810,
        height: 395
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