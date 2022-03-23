import React, {useEffect, useState} from 'react';

import { PROFILE_ID } from '../utils/config-frontend';
import{createPost} from '../requests/publications/post'
import { v4 as uuidv4 } from 'uuid';

const medatdatObject = {
    version: '1.0.0',
    metadata_id: uuidv4(),
    description: 'Description',
    content: 'My first post',
    external_url: null,
    image: null,
    imageMimeType: null,
    name: 'Name',
    attributes: [],
    media: [],
    appId: 'testing123',
  }



  const Post = ({id=PROFILE_ID}) =>{
      async function post(){
        createPost(id, medatdatObject )
      }
      return<button onClick={post}>post</button>
  }

  export default Post;