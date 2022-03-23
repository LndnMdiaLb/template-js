import React, {useState} from 'react';

function Controlled() {
    const [firstName, setFirstName] = useState('');
    
    return (
      <input 
        value={firstName}   
        name="firstName" 
        onChange={e => setFirstName(e.target.value)} />
    );
  }

export default Controlled;