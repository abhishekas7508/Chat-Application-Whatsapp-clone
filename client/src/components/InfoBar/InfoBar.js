import React from "react";

import './InfoBar.css';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

const InfoBar= ({room}) =>{
    return(
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online image"/>
            <h3>{room}</h3>
        </div>
        <div className="CenterInnerContainer">
        <h3>WhatsApp</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="close image" /></a>
        </div>
    </div>
    );
}

export default InfoBar;