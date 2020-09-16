import React from 'react';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import DashboardIcon from '@material-ui/icons/Dashboard';
export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
   <NavLink to="/dashboard" className="inactive" activeClassName="active">
   <ListItemText primary="Dashboard" />
   </NavLink>
    </ListItem>
    <NavLink to="/branches" className="inactive" activeClassName="active"  >
      <ListItem button>
        <ListItemIcon>
          <img src={require('../../../assets/images/icons/branch.png')} alt="branch"/>
        </ListItemIcon>
        <ListItemText primary="Branches" />
      </ListItem>
    </NavLink>
    <NavLink to="/roles"  className="inactive" activeClassName="active">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Roles" />
      </ListItem>
    </NavLink>
    <NavLink to="/classes" className="inactive" activeClassName="active">
      <ListItem button>
        <ListItemIcon>
          <img src={require('../../../assets/images/icons/public.png')} alt="classes"/>
        </ListItemIcon>
        <ListItemText primary="Classes" />
      </ListItem>
    </NavLink>
    <NavLink to="/staff" className="inactive" activeClassName="active">
      <ListItem button>
        <ListItemIcon>
      <PeopleOutlineIcon/>
        </ListItemIcon>
        <ListItemText primary="Staff" />
      </ListItem>
    </NavLink>
    <NavLink to="/students" className="inactive" activeClassName="active">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon/>
        </ListItemIcon>
        <ListItemText primary="Students" />
      </ListItem>
    </NavLink>

  </div>
);

export const secondaryListItems = (
  <div>
     <NavLink to="/payments" className="inactive" activeClassName="active">
    <ListItem button>
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Payments" />
    </ListItem>
    </NavLink>
    
  </div>
);