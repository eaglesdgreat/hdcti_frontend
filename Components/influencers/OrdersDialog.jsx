import React from 'react';
import DialogComponent from '../DialogComponent';
import OrdersAccordion from './OrdersAccordion'
import {
  Box,
  Typography,
  Grid,
  Divider,
} from '@material-ui/core';

const OrdersDialog = ({
  data,
  openDialog,
  handleDialogClose,
  scroll
}) => {
  return (
    <DialogComponent
      openDialog={openDialog}
      handleDialogClose={handleDialogClose}
      scroll={scroll}
    >
      {
        data.length > 0 ? data
          .map((item, index) => (
            <Grid key={index} container style={{ overflow: "scroll" }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box style={{
                  border: "1px solid #EAEAEA",
                  borderRadius: "4px",
                  marginBottom: "1.5rem"
                }}>
                  <Typography style={{ padding: "0.7rem 1.5rem" }}>
                    CUSTOMER
                  </Typography>
                  <Divider light />
                  <Box style={{ padding: "0.7rem 1.5rem" }}>
                    <Typography style={{ fontWeight: "500", }}>
                      {item.User.firstName} {item.User.lastName}
                    </Typography>
                    <Typography>
                      0802 441 9462
                    </Typography>
                    <Typography>
                      emma4boss@yahoo.com
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box style={{
                  border: "1px solid #EAEAEA",
                  borderRadius: "4px",
                  marginBottom: "1.5rem",
                  padding: "1.2rem 1.5rem"
                }}>
                  {
                    item.ordrpayment.map((paymentItem, index) => (
                      <Box key={index}>
                        <Typography style={{ color: "#000000" }}>
                          REQUEST ID: {paymentItem.requestId}
                        </Typography>
                        <Typography style={{ fontWeight: "500", }}>
                          {paymentItem.product.name}
                        </Typography>
                        <Box style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
                          <img src={paymentItem.product.images[0]} style={{
                            width: "5rem",
                            marginRight: "1.5rem"
                          }} />
                          <Box>
                            <Typography style={{ fontSize: "0.85rem" }}>
                              N/A, Black
                            </Typography>
                            <Typography style={{ fontSize: "0.85rem" }}>
                              ₦{paymentItem.product.price.toLocaleString()}
                            </Typography>
                            <Typography style={{ fontSize: "0.85rem" }}>
                              Qty: {paymentItem.quantity}
                            </Typography>
                          </Box>
                        </Box>
                        <Box style={{
                          display: "flex",
                          background: "#FFF7F2",
                          borderRadius: "8px",
                          padding: "1.2rem 1.5rem",
                          marginBottom: "3rem"
                        }}>
                          <Typography style={{ marginRight: "2rem" }}>
                            SOLD BY
                          </Typography>
                          <Box>
                            <Typography style={{ color: "#FF5C00", fontWeight: "500" }}>
                              {paymentItem.product.wholesalerBusinessName}
                            </Typography>
                            <Typography>
                              {paymentItem.product.wholesalerPhone}
                            </Typography>
                            <Typography>
                              {paymentItem.product.wholesalerEmail}
                            </Typography>
                          </Box>
                        </Box>
                        <Divider light />
                        <Box style={{ marginBottom: "2rem" }}>
                          <OrdersAccordion data={paymentItem} />
                        </Box>
                      </Box>
                    ))
                  }
                </Box>
              </Grid>
            </Grid>
          )) : "No data fetched"
      }
    </DialogComponent>
  )
}

export default OrdersDialog;