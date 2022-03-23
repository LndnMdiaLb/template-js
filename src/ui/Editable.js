import React, {useState} from 'react';

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
const Editable = ({
    text,
    type,
    placeholder,
    children,
    ...props
  }) => {
      
    const [isEditing, setEditing] = useState(false);
    const handleKeyDown = (event, type) => {
      // Handle when key is pressed
    };
  
  /*
  - It will display a label is `isEditing` is false
  - It will display the children (input or textarea) if `isEditing` is true
  - when input `onBlur`, we will set the default non edit mode
  Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
  */
    const editable = children[0];
    const display = children[1];
    return (
      <section {...props}>
        {isEditing ? (
          <div
            onBlur={() => setEditing(false)}
            onKeyDown={e => handleKeyDown(e, type)}
          >
            {editable}
          </div>
        ) : (
          <div
            onClick={() => setEditing(true)}
          >
            {display}
          </div>
        )}
      </section>
    );
  };

export default Editable;