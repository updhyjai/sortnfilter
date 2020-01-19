import React from 'react';
const CharacterAttribute = (props) =>{
    return(
        <div className="attributes">
            <span className = "attributeField">{props.attributeField}</span>
    <span>{' '}</span>
            <span className = "attributeValue">{props.attributeValue}</span>
        </div>
    );
}

export default CharacterAttribute;