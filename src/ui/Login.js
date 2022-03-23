import React, {useEffect, useState} from 'react';

import ProfileDisplay from './ProfileDisplay';
import {login} from '../requests/authentication/login'

const Login = ()=>{
    const [loggedin, setLogin]=useState(false);
    
    useEffect(async ()=>{
        // returns authentication data object
        const {
             authenticate:{
                 accessToken, 
                 refreshToken
                } 
            } = await login();
            setLogin(true);
            /* LOGIN FAILS? */
    },[]);
    return  <>
                {loggedin?
                    <ProfileDisplay/>
                    :
                    <div>collecting...</div>
                }
            </>
};

export default Login;