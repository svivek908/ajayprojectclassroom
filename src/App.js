import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ForgotPassword from './components/layout/ForgotPassword';
import Registration from './components/layout/Registration'
import './App.css';
import Dashboard from './components/layout/dashboard/Dashboard';
import Roles from './components/views/Roles/Roles';
import Branches from './components/views/Branches/Branches';
import Classes from './components/views/Classes/Classes';
import ProtectedRoute from './ProtectedRoute';
import Auth from './container/Auth';
import AddNewClasses from './components/views/Classes/AddNewClasses';

import ClassesTable from './components/views/Classes/ClassesTable';
import RolesmuiDataTable from './components/views/Roles/RolesmuiDataTable';
import Students from './components/views/students/Students';
import Staff from './components/views/staff/Staff';
import Payments from './components/views/payments/Payments';
import Profile from './components/profile/Profile';
import Settings from './components/profile/Settings';
import AllBranchesList from './components/views/Branches/AllBranchesList';


function App() {
  return (
    <>
    
      
        <Switch>
          
          <Route exact path="/" component={Auth} />
          <Route exact path="/Table" component={ClassesTable}/>
          <Route exact path="/forgot" component={ForgotPassword} />
          <Route exact path="/register" component={Registration} />
          <ProtectedRoute exact path="/profile" cmp={Profile} />
          <ProtectedRoute exact path="/setting" cmp={Settings} />
          <ProtectedRoute exact path="/RolesData" cmp={RolesmuiDataTable} />
          <ProtectedRoute exact path="/dashboard" cmp={Dashboard} />
          <ProtectedRoute exact path="/roles" cmp={Roles} />
          <ProtectedRoute exact path="/students" cmp={Students} />
          <ProtectedRoute exact path="/staff" cmp={Staff} />
          <ProtectedRoute exact path="/payments" cmp={Payments} />
          <ProtectedRoute exact path="/branches" cmp={Branches} />
          <ProtectedRoute exact path="/classes" cmp={Classes} />
          <ProtectedRoute exact path="/classes/:add" cmp={AddNewClasses} />
          <ProtectedRoute exact path="/allBranches" cmp={AllBranchesList} />
        </Switch>
      
    </>
  );
}

export default App;
