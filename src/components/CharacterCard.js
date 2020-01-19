import React from 'react';
import CharacterImage from "./CharacterImage"
import CharacterAttribute from "./CharacterAttribute"

const CharacterCard = props =>{
    const calculateTimeDifference = (time) =>{
        let diff =(Date.now() - (new Date(time))) / 1000;
        diff /= (60 * 60 * 24);
       return Math.abs(Math.round(diff/365.25));
    } 
    return(
        <div className = 'card'>
            <CharacterImage image = {props.image} name = {props.name} id = {props.id} time = {calculateTimeDifference( props.created)}/>
            <div className = "card-body">
            
            <CharacterAttribute attributeField = {"Status"} attributeValue = {props.status}/>
            <CharacterAttribute attributeField = {"Species"} attributeValue = {props.species}/>
            <CharacterAttribute attributeField = {"Gender"} attributeValue = {props.gender}/>
            <CharacterAttribute attributeField = {"Origin"} attributeValue = {props.origin.name}/>
            <CharacterAttribute attributeField = {"Last Location"} attributeValue = {props.location.name}/>
           
            </div>
        </div>
    );
}

export default CharacterCard;