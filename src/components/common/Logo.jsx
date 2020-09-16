import React, { Component } from 'react';

class Logo extends Component {
    render() {
        return (
            <div>
               <img src={require('../../assets/images/logo.png')} height="80" width="180"  alt ="logo"/>
            </div>
        );
    }
}

export default Logo;