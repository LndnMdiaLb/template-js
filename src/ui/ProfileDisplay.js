import React, {useEffect, useState} from 'react';

import ProfileEditor from './ProfileEditable';
import {profiles} from '../requests/profile/get-profiles'

const ProfileDisplay = ()=>{
    const [_profiles, upate]=useState([]);
    useEffect(async ()=>{
        const profileData = await profiles();
        const {profiles:{ items: allprofiles }} = profileData;
        upate(allprofiles);
    },[]);

    return  <> {_profiles.map((props)=> <ProfileEditor {...props}/>)} </>;
};

export default ProfileDisplay;