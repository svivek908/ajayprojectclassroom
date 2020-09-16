import React, {useState, useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import Strings from '../components/common/String';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import API from '../Service';


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

const Login=()=> {
const classes = useStyles();
const history = useHistory();

const[state, setState]=useState({
    email:'',
    password:''
})
const [data, Setdata]=useState()
const handleChange = (e) => {
    const {name , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [name] : value
    }))
}

 

const handleSubmitClick=(e)=>{

    e.preventDefault();
     
     
    
     
    // if(state.email){
    //     history.push("/Dashboard");
    // }
}
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {Strings.LoginTitle}
          </Typography>
                <form onSubmit={handleSubmitClick} className={classes.form} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={state.email}
                        onChange={handleChange}
                        
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={state.password}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >
                       {Strings.BtnName}
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <NavLink to="/forgot">
                                {Strings.Link}
                            </NavLink>
                        </Grid>
                        <Grid item>
                            <NavLink to="/register">
                                {"Don't have an account? Sign Up"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
}
export default Login;