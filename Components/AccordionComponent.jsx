import React, { useState } from 'react'
import { Typography } from '@material-ui/core';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

const Accordion = withStyles({
  root: {
    border: '0px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#ffffff',
    borderBottom: '0px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const AccordionComponent = ({ children, title }) => {

  // Accordion states
  const [expanded, setExpanded] = useState('panel1');

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Accordion square
      expanded={expanded === 'panel1'}
      onChange={handleAccordionChange('panel1')}
    >
      <AccordionSummary aria-controls="order-details" id="panel1d-header">
        <Typography>{title}</Typography>
        {
          expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />
        }
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionComponent;