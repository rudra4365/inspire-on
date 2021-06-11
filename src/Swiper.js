import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import "./Swiper.css"


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Steps = [
    {
        label: "It is not in the stars to hold our destiny but in ourselves.",
        imgPath: "William Shakespeare"
    }
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 100,
    width: 500,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
}));

function Swiper(props) {

    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = Steps.length;

    // useEffect(() => {
        
      
        
    //   }, []);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  if(Steps.length <= 50) {
    // Steps.push({label: "Quotes", imgPath: "for all"});
    props.qts.map(qt => (
        Steps.push({label: qt.text, imgPath: qt.author})
    ));
    }

  return (
    <div className = "App2">
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{Steps[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {Steps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              step.imgPath
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
    </div>
  );
}

export default Swiper;