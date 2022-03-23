import React, {useEffect, useState} from 'react';

import Editable from './Editable';
import GetPublications from './GetPublications'
import Post from './Post';
import {updateProfile} from '../requests/profile/update-profile'

const ProfileEditor = ({ 
    id,
    name,
    coverPicture,
    picture,
    bio,
    location,
    twitterUrl,
    website})=>{
        
const [_name, setName]= useState(name);
const [_bio, setBio]= useState(bio);
const [_location, setLocation]= useState(location);
const [_twitter, setTwitter]= useState(twitterUrl);
const [_website, setWebsite]= useState(website);

const update = async ()=>{
    await updateProfile({
        profileId: id,
        name: _name,
        bio: _bio,

        coverPicture: null,

        location: _location,
        twitterUrl: _twitter,
        website: _website,

      });
};

return  <div>
            <Editable>
                <textarea
                    name="name"
                    placeholder="Change Name"
                    rows="5"
                    value={_name}
                    onChange={e => setName(e.target.value)}
                />
                <h1>{_name || 'add'}</h1>
            </Editable>
            {coverPicture && <img src={coverPicture}/>}
            {picture && <img src={picture}/>}
            <Editable>
                <textarea
                    name="bio"
                    placeholder="Change Bio"
                    rows="5"
                    value={_bio}
                    onChange={e => setBio(e.target.value)}
                />
                <p>{_bio || 'add'}</p>
            </Editable>    
            <ul>
                <Editable>
                    <textarea
                        name="location"
                        placeholder="Change Location"
                        rows="5"
                        value={_location}
                        onChange={e => setLocation(e.target.value)}
                    />
                    <li>{_location || 'add'}</li>
                </Editable>
                <Editable>
                    <textarea
                        name="twitter"
                        placeholder="Change Twitter"
                        rows="5"
                        value={_twitter}
                        onChange={e => setTwitter(e.target.value)}
                    />
                    <li>{_twitter || 'add'}</li>
                </Editable> 
                <Editable>
                    <textarea
                        name="website"
                        placeholder="Change Website"
                        rows="5"
                        value={_website}
                        onChange={e => setWebsite(e.target.value)}
                    />
                    <li>{_website || 'add'}</li>
                </Editable>    
            </ul>
            <button     
                onClick={update
            }>
                update
            </button>
            <Post id={id}/>
            <GetPublications id={id}/>
        </div>
};

export default ProfileEditor;