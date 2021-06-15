import React from 'react';
import AccordionComponent from '../AccordionComponent'
import {
  Box,
  Typography,
  Button,
  Grid,
  InputBase,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  textField: {
    border: "1px solid #EAEAEA",
    borderRadius: "5px",
    width: "100%",
    height: "42px",
    padding: "1rem",
    fontSize: "0.9rem",
    marginBottom: "1.2rem",
  },
}));

const OrdersAccordion = ({ data }) => {
  const classes = useStyles();

  return (
    <AccordionComponent title={`Notes ${data.note.length}`}>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {
            data.note.map((note, index) => (

              <Box key={index} style={{ paddingRight: "3rem" }}>
                <Typography style={{ color: "#6A6A6A", fontSize: "0.95rem" }}>
                  {note.message}
                </Typography>
                <Typography style={{
                  fontSize: "0.8rem",
                  color: "#242120",
                  fontWeight: 500,
                }}>
                  {note.name}
                </Typography>
                <Typography style={{
                  fontSize: "0.75rem",
                  color: "#6A6A6A",
                  marginBottom: "1rem"
                }}>
                  {note.createdAt}
                    9:03, Nov 21, 2020
                  </Typography>
              </Box>
            ))
          }
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box style={{ textAlign: "left" }}>
            <InputBase
              style={{ height: "84px", }}
              className={classes.textField}
              variant="outlined"
              multiline
              type="text"
              rows={4}
              name="address"
            />
            <Button
              style={{
                background: "#FF5C00",
                color: "#FFFFFF",
                borderRadius: "4px",
              }}
              variant="contained"
            >
              <Typography style={{ fontSize: "0.9rem", }}>
                SAVE
                </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </AccordionComponent>
  )
}

export default OrdersAccordion;