import React, { useState, useEffect } from 'react'
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  Button,
  NoSsr,
  Divider,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Check from '@material-ui/icons/Check'

import Layout from './../../Components/Layout'


const useStyles = makeStyles((theme) => ({
  root: {
    background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    border: '1px solid var(--unnamed-color-e0e0e0)',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '1px solid #E0E0E0',
    borderRadius: '5px',
    opacity: 1,
    width: '97%',
    height: '623px',
    [theme.breakpoints.down('sm')]: {
      height: 'max-content',
    }
  },
  box: {
    background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '3px solid #362D7312',
    opacity: 1,
    height: '459px',
  },
  uncheckText: {
    font: 'var(--unnamed-font-style-normal) normal bold 15px/18px var(--unnamed-font-family-helvetica-neue)',
    letteSpacing: 'var(--unnamed-character-spacing-0)',
    textAlign: 'left',
    font: 'normal normal bold 15px/18px Helvetica Neue',
    letterSpacing: '0px',
    color: '#FFFFFFFD',
    opacity: 1,
  },
  checkBox: {
    background: '#28A745 0% 0% no-repeat padding-box',
    borderRadius: '4px',
    opacity: 1,
  },
  completed: {
    // color: '#784af4',
    // zIndex: 1,
    // fontSize: 18,
    background: "transparent url('/check.png') 0% 0% no-repeat padding-box",
    opacity: 1,
  }, 
  circle: {

  }
}))


function QontoStepIcon(props) {
  const classes = useStyles();
  const { active, completed, activeStep } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {
        completed ? 
          <div className={classes.checkBox}>
            {/* <Check className={classes.completed} /> */}
          </div>
        :  
          <div className={classes.circle}>
            <Typography className={classes.uncheckText}>{activeStep}</Typography>
          </div>
      }
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,

  // Value for the active step
  activeStep: PropTypes.number,
};


function getSteps() {
  return ['Details', 'Applicant Info', 'Business Info', 'Loan Details', "Guarantor's Details"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    case 3:
      return 'Stepper 4'
    case 4:
      return 'Stepper 5'
    default:
      return 'Unknown step';
  }
}


export default function StepperForm() {
  const path = '/loans'
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  return (
    <Layout path={path}>
      <NoSsr>
        <Box className={classes.root}>
          <Stepper activeStep={activeStep}>
            {
              steps.map((label, i) => (
                <Step key={i}>
                  <StepLabel>
                    {label}
                  </StepLabel>
                </Step>
              ))
            }
          </Stepper>

          <Divider light />
          
          <Box style={{ width:'85%', margin: 'auto', paddingTop: '40px'}}>
            <Box className={classes.box}>
              <Typography>{getStepContent(activeStep)}</Typography>

              <Box>
                {
                  activeStep === 0 ? '' : (
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                      Previous
                    </Button>
                  )
                }

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </NoSsr>
    </Layout>
  )
}