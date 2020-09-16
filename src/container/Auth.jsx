
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from "@material-ui/core/styles";
import history from '../history';
import baseUrl from '../Config';
import './style.css';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  MuiInputLabel: {
    outlined: {
      '&$shrink': {
         transform: 'translate(14px, 0px) scale(1)',
        },
    },
  },
  avatar: {
    margin: theme.spacing(3),
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


class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: '',
        password: '',
      },
      submitted: false,
    }
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });

  }

  handleSubmit = () => {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 1000);
      this.CallLoginAPI();
    });
  }
   
  CallLoginAPI = () => {
    const user = {
      email: this.state.formData.email,
      password: this.state.formData.password
    }

    fetch(`${baseUrl.apiUrl}login`, {
      method: 'post',
      body: JSON.stringify(user)
    }).then(function (response) {
      return response.json();
    })
      .then(function (data) {

        const sessionkey = data.access_token;
        const userData = data.data;
      
        const userId = userData.id;
        const userEmail = userData.email;
        console.log(userData);
        localStorage.setItem('accessToken', sessionkey)
        localStorage.setItem('useremail', userEmail)
        localStorage.setItem('id', userId)
        if (data.code === 200) {
          history.push('/dashboard');

        }
        else if (data.code === 204) {
          alert('User Invalid Credentials')
        }

      })
  }

  render() {

    const { classes } = this.props;
    const { formData, submitted } = this.state;
    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: '4rem' }}>
        <CssBaseline />
        <div className={classes.paper} style={{ textAlign: 'center' }}>
          <Avatar style={{ margin: 'auto', backgroundColor: 'rgb(220, 0, 78)' }}  >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
            <TextValidator
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.handleChange}
              autoComplete="current-password"
              value={formData.password}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              style={{ marginLeft: '-10rem' }}
            />
            <Button
              color="primary"
              fullWidth
              variant="contained"
              type="submit"
              disabled={submitted}

            >
              {
                (submitted && 'Your form is submitted!')
                || (!submitted && 'Submit')
              }
            </Button>
            <Grid container>
              <Grid item xs>
                <NavLink to="/forgot" variant="body2">
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </ValidatorForm>
        </div>
      </Container>
    );
  }
}
export default withStyles(useStyles)(Auth);