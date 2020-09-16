import React from 'react'
import { Redirect } from 'react-router-dom'

function ProtectedRoute(props) {
    const Cmp=props.cmp
     const isauthentication=localStorage.getItem('accessToken');

    return (
        <div>{isauthentication ? <Redirect to="/"> </Redirect> :  <Cmp/> }</div>
    )
}

export default ProtectedRoute