import React from 'react';
import {
  Box,
  Typography,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

// CSS Styles
const useStyles = makeStyles((theme) => ({
  boxDisplay: {
    width: "100%",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
  },
  boxRight: {
    display: "flex",
    padding: "2rem",
    width: "100%",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
  },
  smallTopBox: {
    padding: "1rem 1rem 1rem 1.5rem",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #F1F1F1",
    borderRadius: "8px",
    margin: "0 1rem 0.5rem 0",
  },
}));

const InfluencerInfo = ({
  data,
  filteredOrders,
  filteredPayments,
  additionalType
}) => {
  const classes = useStyles();

  return (
    <Grid container item spacing={3}>
      <Grid
        item
        xs={12} sm={5} md={5} lg={5} xl={5}
      >
        <Box style={{ height: "100%" }}>
          <Box style={{ marginBottom: "1rem" }} className={classes.boxDisplay}>
            <Box style={{
              background: "#FF5C00",
              borderRadius: "4px 4px 0 0",
              padding: "1rem 1rem 2.5rem 1rem",
            }}>
              <Typography style={{
                fontWeight: 600,
                color: "#FFFFFF",
                fontSize: "1.2rem"
              }}>
                {data.influencer.firstName} {data.influencer.lastName}
              </Typography>
            </Box>

            <Box style={{
              padding: "1rem 2rem 1rem 1rem",
            }}>
              <Typography style={{ color: "#6A6A6A" }}>
                Contact Info
              </Typography>

              <Typography>
                {data.influencer.email}
              </Typography>

              <Typography style={{ fontWeight: "500", }}>
                {data.influencer.phone}
              </Typography>

              <Box style={{ marginTop: "1rem", }}>
                <Typography style={{ color: "#6A6A6A", marginBottom: "0.4rem" }}>
                  Address
                </Typography>

                <Typography>
                  {data.influencer.address}, {data.influencer.city}, {data.influencer.state}.
                </Typography>
              </Box>

              <Box style={{
                marginTop: "1rem"
              }}>
                <Typography style={{
                  color: "#6A6A6A",
                }}>
                  Additional User Type
                </Typography>

                <Typography style={{
                  padding: "0.15rem 0",
                  color: "#242120",
                }}>
                  {additionalType(data.influencer.userTypes)}
                </Typography>

                {/* <Typography style={{
                          color: "#FF5C00",
                        }}>
                          Switch to user type
                        </Typography> */}
              </Box>
            </Box>
          </Box>

          <Box style={{ padding: "1rem" }} className={classes.boxDisplay}>
            <Typography>
              Last Login
            </Typography>

            <Typography>
              {moment(data.lastLogin).format('MMM DD, YYYY')}, {moment(data.lastLogin).format('hh:mm a')}
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid
        item container
        xs={12} sm={7} md={7} lg={7} xl={7}
      >
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box className={classes.smallTopBox}>
            <Typography style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              {
                filteredOrders.length > 0 ? filteredOrders.length :
                  !data.order.length && filteredOrders.length === 0 ? 0 :
                    data.order.length
              }
            </Typography>

            <Typography style={{ color: "#6A6A6A", fontSize: "0.9rem" }}>
              ORDERS RAISED
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box className={classes.smallTopBox}>
            <Typography style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              ₦{
                (filteredOrders.length > 0 ? filteredOrders : data.order)
                  .map(amount => amount.finalTotal).reduce((a, b) => a = Number(a) + Number(b), 0)
                  .toLocaleString()
              }
            </Typography>

            <Typography style={{ color: "#6A6A6A", fontSize: "0.9rem" }}>
              IN REVENUE
            </Typography>
          </Box>
        </Grid>

        <Box style={{
          flexDirection: "column",
          marginTop: "0.8rem"
        }}
          className={classes.boxRight}
        >
          <Box style={{ marginBottom: "1.5rem" }}>
            <Typography style={{ color: "#6A6A6A" }}>
              Account Details
            </Typography>

            <Typography style={{
              padding: "0.15rem 0",
              color: "#242120",
            }}>
              1100206363, Kuda Microfinance Bank
              Iluezi-Ogbaudu Onowomano
            </Typography>
          </Box>

          <Box style={{ marginBottom: "1.5rem" }}>
            <Typography style={{ color: "#6A6A6A" }}>
              Invited by
            </Typography>

            <Typography style={{
              padding: "0.15rem 0",
              color: "#242120",
              textDecoration: "underline"
            }}>
              {data.influencer.invited_by.firstName} {data.influencer.invited_by.lastName}
            </Typography>
          </Box>

          <Box style={{ display: "flex", }}>
            <Box style={{ marginRight: "5rem" }}>
              <Box>
                <Typography style={{
                  color: "#6A6A6A",
                  marginRight: "1rem",
                  marginTop: "0.5rem"
                }}>
                  Referral Code
                </Typography>

                <Typography style={{
                  padding: "0.15rem 0",
                  color: "#242120",
                }}>
                  {data.influencer.refCode}
                </Typography>
              </Box>

              <Box>
                <Typography style={{
                  color: "#6A6A6A",
                  marginRight: "1rem",
                  marginTop: "0.5rem"
                }}>
                  Sign -up Platform
                </Typography>

                <Typography style={{
                  padding: "0.15rem 0",
                  color: "#242120",
                }}>
                  {
                    data.influencer.platform === 'wholesaler'
                      ? 'Wholesale Center' : 'Marketplace Center'
                  }
                </Typography>
              </Box>
            </Box>

            <Box>
              <Box>
                <Typography style={{
                  color: "#6A6A6A",
                  marginRight: "1rem",
                  marginTop: "0.5rem"
                }}>
                  Total Earnings
                </Typography>

                <Typography style={{
                  padding: "0.15rem 0",
                  color: "#242120",
                }}>
                  ₦{
                    (filteredPayments > 0 ? filteredPayments : data.payment)
                      .filter(payment => payment.earnId !== (null || ''))
                      .map(amount => amount.amount).reduce((a, b) => Number(a) + Number(b), 0)
                      .toLocaleString()
                  }
                </Typography>
              </Box>

              <Box>
                <Typography style={{
                  color: "#6A6A6A",
                  marginRight: "1rem",
                  marginTop: "0.5rem"
                }}>
                  Sign-up Date
                </Typography>

                <Typography style={{
                  padding: "0.15rem 0",
                  color: "#242120",
                }}>
                  {moment(data.influencer.createdAt).format('MMM DD, YYYY')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default InfluencerInfo;