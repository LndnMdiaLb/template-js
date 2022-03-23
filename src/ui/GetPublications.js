import React, {useEffect, useState} from 'react';

import { PROFILE_ID } from '../utils/config-frontend';
import{getPublications} from '../requests/publications/get-publications'
import { v4 as uuidv4 } from 'uuid';

const GetPublications = ({id=PROFILE_ID}) =>{
      const types= ['POST', 'COMMENT', 'MIRROR'];
      async function getPrublications(){
        console.log(await getPublications(id,types));
      }
      return<button onClick={getPrublications}>publications</button>
  }

  export default GetPublications;