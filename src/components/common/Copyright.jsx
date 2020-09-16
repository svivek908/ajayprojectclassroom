import React from 'react';
import {NavLink} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <NavLink to="#" color="inherit" >
        DrivingClassRoom 
        </NavLink>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }