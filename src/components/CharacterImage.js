import React from 'react';
const CharacterImage = props =>{
return(
    <>
        <figure>
            <img className = "characterImage" src = {props.image} alt = {props.name} />
            <figcaption>
                <h3 className = "characterName">{props.name}</h3>
                <h5 className = "characterDetail">{`ID: ${props.id} - created ${props.time} years ago`}</h5>
            </figcaption>
        </figure>
    </>
);
}

export default CharacterImage;