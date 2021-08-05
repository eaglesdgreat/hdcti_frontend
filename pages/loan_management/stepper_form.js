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
  StepConnector,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import axios from "axios";
import clsx from 'clsx'
import Check from '@material-ui/icons/Check';
import { useRouter } from 'next/router'
import { useSnackbar } from "notistack";

import Layout from './../../Components/Layout'
import Stepper1 from './../../Components/stepper_components/Stepper1'
import Stepper2 from './../../Components/stepper_components/Stepper2'
import Stepper3 from './../../Components/stepper_components/Stepper3'
import Stepper4 from './../../Components/stepper_components/Stepper4'
import Stepper5 from './../../Components/stepper_components/Stepper5'
import { useStateValue } from "./../../StateProviders";
import validations from "./../../lib/validations";
import { isAuthenticated } from "./../../lib/auth.helper";



const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#362d73',
      background: 'var(--unnamed-color-362d73) 0% 0% no-repeat padding-box',
      background: '#362D73 0% 0% no-repeat padding-box',
      opacity: 1,
    },
  },
  completed: {
    '& $line': {
      borderColor: '#0d0d0d',
      background: 'var(--unnamed-color-0d0d0d) 0% 0% no-repeat padding-box',
      background: '#0D0D0DA0 0% 0% no-repeat padding-box',
      opacity: 1,
    },
  },
  line: {
    borderColor: '#362D738B',
    borderTopWidth: 3,
    borderRadius: 1,

    background: '#362D738B 0% 0% no-repeat padding-box',
    opacity: 1,
  },
})(StepConnector);


const useStyles = makeStyles((theme) => ({
  root: {
    background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    border: '1px solid var(--unnamed-color-e0e0e0)',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '1px solid #E0E0E0',
    borderRadius: '5px',
    opacity: 1,
    width: '97%',
    height: 'max-content',
  },
  box: {
    background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '3px solid #362D7312',
    opacity: 1,
    height: 'max-content',
  },
  uncheckText: {
    font: 'var(--unnamed-font-style-normal) normal bold 15px/18px var(--unnamed-font-family-helvetica-neue)',
    letteSpacing: 'var(--unnamed-character-spacing-0)',
    textAlign: 'center',
    font: 'normal normal bold 15px/18px Helvetica Neue',
    letterSpacing: '0px',
    color: '#FFFFFFFD',
    opacity: 1,
  },
  check: {
    color: '#ffffff',
    zIndex: 1,
    fontSize: 18, 
    opacity: 1
  },
  root2: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    background: 'var(--unnamed-color-362d73) 0% 0% no-repeat padding-box',
    background:' #362D73 0% 0% no-repeat padding-box',
    border: '1px solid #362D738B',
    borderRadius: '4px',
    opacity: 1,
    width: 22,
    height: 22
  },
  circle: {
    border: '1px solid #362D738B',
    borderRadius: '4px',
    opacity: 1,
    width: 22,
    height: 22,
    padding: '1px',
  },
  completed: {
    background: '#28A745 0% 0% no-repeat padding-box',
    borderRadius: '4px',
    padding: '1.5px',
    opacity: 1,
    width: 22,
    height: 22
  },
  unactive: {
    font: 'var(--unnamed-font-style-normal) normal bold 15px/18px var(--unnamed-font-family-helvetica-neue)',
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    textAlign: 'center',
    font: 'normal normal bold 15px / 18px Helvetica Neue',
    letterSpacing: '0px',
    color: '#362D7365',
    opacity: 1,
  },
  prevButton: {
    background: '#C9C9C9 0% 0% no-repeat padding-box',
    borderRadius: '5px',
    opacity: 1,
    width: '92px',
    height: '40px',

    font: 'var(--unnamed-font-style-normal) normal 600 var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)',
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    textAlign: 'center',
    font: 'normal normal 600 14px/21px Poppins',
    letterSpacing: '0px',
    color: '#3E3E3E',
    opacity: 1,

    '&:hover': {
      background: 'var(--unnamed-color-362d73) 0% 0% no-repeat padding-box',
      background: '#362D73 0% 0% no-repeat padding-box',
      borderRadius: '5px',
      opacity: 1,

      font: 'var(--unnamed-font-style-normal) normal 600 var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)',
      letterSpacing: 'var(--unnamed-character-spacing-0)',
      color: 'var(--unnamed-color-ffffff)',
      textAlign: 'center',
      font: 'normal normal 600 14px/21px Poppins',
      letterSspacing: ' 0px',
      color: '#FFFFFF',
      opacity: 1,
    }
  },
  button: {
    background: '#72A624 0% 0% no-repeat padding-box',
    borderRadius: '5px',
    opacity: 1,
    width: '64px',
    height: '40px',
    marginLeft: '13px',

    font: 'var(--unnamed-font-style-normal) normal 600 var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)',
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    color: 'var(--unnamed-color-ffffff)',
    textAlign: 'center',
    font: 'normal normal 600 14px/21px Poppins',
    letterSspacing: ' 0px',
    color: '#FFFFFF',
    opacity: 1,

    '&:hover': {
      background: 'var(--unnamed-color-362d73) 0% 0% no-repeat padding-box',
      background: '#362D73 0% 0% no-repeat padding-box',
      borderRadius: '5px',
      opacity: 1,

      font: 'var(--unnamed-font-style-normal) normal 600 var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)',
      letterSpacing: 'var(--unnamed-character-spacing-0)',
      color: 'var(--unnamed-color-ffffff)',
      textAlign: 'center',
      font: 'normal normal 600 14px/21px Poppins',
      letterSspacing: ' 0px',
      color: '#FFFFFF',
      opacity: 1,
    }
  },
}))


function QontoStepIcon(props) {
  const classes = useStyles();
  const { active, completed, icon } = props;
  // console.log(props)

  return (
    <div
      className={clsx(classes.root2, {
        [classes.active]: active,
      })}
    >
      {
        completed ? 
          <div className={classes.completed}>
            <Check className={classes.check} />
          </div>
        :  
          <div className={classes.circle}>
            {
              active ? (<Typography className={classes.uncheckText}>{icon}</Typography>) : (<Typography className={classes.unactive}>{icon}</Typography>)
            }
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

function getSteps2() {
  return ['Details', 'Applicant Info', 'Loan Details', "Guarantor's Info"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (<Stepper1 />);
    case 1:
      return (<Stepper2 />);
    case 2:
      return (<Stepper3 />);
    case 3:
      return (<Stepper4 />);
    case 4:
      return (<Stepper5 />);
    default:
      return;
  }
}

function getStepContent2(step, member_exist) {
  switch (step) {
    case 0:
      return (<Stepper1 />);
    case 1:
      return (<Stepper2 new_member={member_exist} />);
    case 2:
      return (<Stepper4 />);
    case 3:
      return (<Stepper5 />);
    default:
      return;
  }
}


export default function StepperForm() {
  const path = '/loans'
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const token = isAuthenticated().auth_token;

  const member_exist = router.query.exist_member === 'true' ? true : false

  const [{ exist_mem }, dispatch] = useStateValue();

  const addToBasket = (data) => {
    dispatch({
      type: "EXIST_MEMBER",
      item: data,
    });
  };

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (member_exist) {
      addToBasket(member_exist)
    } else {
      addToBasket(member_exist)
    }
  }, [member_exist])

  const steps = member_exist ? getSteps2() : getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    const stepper1 = JSON.parse(localStorage.getItem("stepper1"))
    const stepper2 = JSON.parse(localStorage.getItem("stepper2"))
    const stepper3 = JSON.parse(localStorage.getItem("stepper3"))
    const stepper4 = JSON.parse(localStorage.getItem("stepper4"))
    const stepper5 = JSON.parse(localStorage.getItem("stepper5"))

    const obj = { ...stepper1, ...stepper2, ...stepper3, ...stepper4, ...stepper5 }

    let body = {};
    let url = ''

    if(obj.member_exist) {
      body.phoneNextOfKin = obj.next_kin_phone
      body.groupOfApp = obj.group_of_application
      body.bank = obj.bank
      body.accountNo = obj.account_number
      body.typeOfBusiness = obj.type_of_business
      body.businessDuration = obj.business_length
      body.amtSavingsInPassbook = obj.amount_of_savings
      body.busnessAddress = obj.business_address
      body.familyOnHcdtiGroup = obj.family_member_in_hcdti
      body.lastLoanRecieved = obj.last_loan_received
      body.dateLastLoanRepaid = obj.repay_last_loan_date
      body.loanAppliedFor = obj.loan_applied
      body.indeptedToMfbMfi = obj.indept
      body.outsanding = ''
      body.nameOfGuarantor = obj.name_of_guarantor
      body.guarantorRelationship = obj.relationship_with_borrower
      body.guarantorOccupation = obj.guarantor_occupation
      body.guarantorHomeAddress = obj.guarantor_home_address
      body.guarantorOfficeAddress = obj.guarantor_office_address
      body.recFromGroup1 = obj.recommendation
      body.recFromGroup2 = ''
      body.appType = obj.app_type
      body.formNo = obj.form_no
      body.state = obj.state
      body.memberNo = obj.phone
      body.fullname = obj.member_name
      body.branch = obj.branch
      body.nameOfFather = obj.father_husband_name
      body.residenceAddress = obj.res_address
      body.permanentAddress = obj.perm_address
      body.maritalStatus = obj.marital_status
      body.formalEdu = obj.formal_education
      body.nextOfKin = obj.next_kin_name
      body.date_of_app = obj.date_of_application

      // url = `${process.env.BACKEND_URL}/account/oldloan`;
      url = `https://hcdti.savitechnig.com/account/oldloan`;
    } else {
      body.phoneNextOfKin = obj.next_kin_phone
      body.groupOfApp = obj.group_of_application
      body.bank = obj.bank
      body.accountNo = obj.account_number
      body.typeOfBusiness = obj.type_of_business
      body.businessDuration = obj.business_length
      body.amtSavingsInPassbook = obj.amount_of_savings
      body.busnessAddress = obj.business_address
      body.familyOnHcdtiGroup = obj.family_member_in_hcdti
      body.lastLoanRecieved = obj.last_loan_received
      body.dateLastLoanRepaid = obj.repay_last_loan_date
      body.loanAppliedFor = obj.loan_applied
      body.indeptedToMfbMfi = obj.indept
      body.outsanding = ''
      body.nameOfGuarantor = obj.name_of_guarantor
      body.guarantorRelationship = obj.relationship_with_borrower
      body.guarantorOccupation = obj.guarantor_occupation
      body.guarantorHomeAddress = obj.guarantor_home_address
      body.guarantorOfficeAddress = obj.guarantor_office_address
      body.recFromGroup1 = obj.recommendation
      body.recFromGroup2 = ''
      body.appType = obj.app_type
      body.formNo = obj.form_no
      body.state = obj.state
      body.memberNo = obj.phone
      body.branch = obj.branch
      body.nameOfFather = obj.father_husband_name
      body.residenceAddress = obj.res_address
      body.permanentAddress = obj.perm_address
      body.maritalStatus = obj.marital_status
      body.formalEdu = obj.formal_education
      body.nextOfKin = obj.next_kin_name
      body.fullname = obj.full_name
      body.phoneNo = obj.phone
      body.date_of_app = obj.date_of_application

      // url = `${process.env.BACKEND_URL}/account/newloan/`;
      url = `https://hcdti.savitechnig.com/account/newloan/`;
    }
    console.log(body)

    if (isValid) {
      setLoading(true);

      try {
        const response = await axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        // console.log(response)

        if (response.data) {
          setLoading(false);

          localStorage.removeItem("stepper1");
          localStorage.removeItem("stepper2");
          localStorage.removeItem("stepper3");
          localStorage.removeItem("stepper4");
          localStorage.removeItem("stepper5");

          enqueueSnackbar(`${response.data.message}`, {
            variant: "success",
          });

          router.push(`/loan_management/loans`);
        }
      } catch (e) {
        if (e.response) {
          console.log(e.response)
          setLoading(false);

          if (e.response.data.detail) {
            enqueueSnackbar(`${e.response.data.detail}, Try again`, {
              variant: "error",
            });
          }

          if (e.response.data.reason) {
            enqueueSnackbar(`${e.response.data.reason}, Try again`, {
              variant: "error",
            });
          } 

          if (!e.response.data.reason && !e.response.data.detail) {
            enqueueSnackbar(`Loan could not be processed but your previous data are saved, Try again`, {
              variant: "error",
            });

            router.push(`/loan_management/create_loan`);
          }

          // setState(initialState);
        }
      }
    }
  }
  
  return (
    <Layout path={path}>
      <NoSsr>
        <Box className={classes.root}>
          <Stepper activeStep={activeStep} connector={<QontoConnector />}>
            {
              steps.map((label, i) => (
                <Step key={i}>
                  <StepLabel StepIconComponent={QontoStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))
            }
          </Stepper>

          <Divider light />
          
          <Box style={{ width: '85%', margin: 'auto', paddingTop: '40px', paddingBottom: '40px'}}>
            <Box className={classes.box}>
              <Typography>{member_exist ? getStepContent2(activeStep, member_exist) : getStepContent(activeStep)}</Typography>

              <Box display="flex" justifyContent="flex-end" style={{padding: '30px', width:'91%', margin:'auto'}}>
                {
                  activeStep === 0 ? '' : (
                    <Button 
                      disabled={activeStep === 0} 
                      onClick={handleBack} 
                      className={classes.prevButton}
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                    >
                      Previous
                    </Button>
                  )
                }

                {
                  activeStep === steps.length - 1 
                  ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={loading}
                        className={classes.button}
                        disableFocusRipple
                        disableRipple
                        disableTouchRipple
                      >
                        {loading ? (
                            <CircularProgress
                              size="2em"
                              style={{ color: "#fff" }}
                            />
                          ) : 
                          'Finish'
                        }
                      </Button>
                  ) 
                   
                  : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                        disableFocusRipple
                        disableRipple
                        disableTouchRipple
                      >
                        Next
                      </Button>
                  )
                }
              </Box>
            </Box>
          </Box>
        </Box>
      </NoSsr>
    </Layout>
  )
}