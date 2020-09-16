import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import Strings from '../common/String';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
class ForgotPassword extends Component{
  state = {
    formData: {
        email: '',
        
    },
    submitted: false,
}

handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
    console.log(formData);
}

handleSubmit = () => {
    this.setState({ submitted: true }, () => {
        setTimeout(() => this.setState({ submitted: false }), 5000);
    });
}


 render(){
  const { classes } = this.props;
  const { formData, submitted } = this.state;
  return (
    <Container component="main" maxWidth="xs" style={{marginTop:'4rem'}}>
      <CssBaseline />
      <div className={classes.paper} style={{textAlign:'center'}}>
        <Avatar className={classes.avatar} style={{margin:'auto', backgroundColor:'rgb(220, 0, 78)'}} >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         {Strings.ForgotTitle}
          </Typography>
          <ValidatorForm
                useref="form"
                onSubmit={this.handleSubmit} className={classes.form}>
          <TextValidator
                variant="outlined"
                margin="normal"
                 
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                label="Email"
                onChange={this.handleChange}
                value={formData.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />

          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
         
            </Button> */}
              <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={submitted}
                    
                >
                    {
                        (submitted && 'Your form is submitted!')
                        || (!submitted && 'Forgot Password')
                    }
                </Button>
          <Grid container>
            <Grid item xs>
              <NavLink to="register">
             {Strings.createaccountlink}
                </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/">
                {"Already have an account? Login"}
              </NavLink>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>

    </Container>
  );
 }
}
export default withStyles(useStyles)(ForgotPassword);