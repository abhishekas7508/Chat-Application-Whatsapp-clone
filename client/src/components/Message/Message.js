import React from "react";
import ReactEmoji from 'react-emoji';

import './Message.css';


const Message= ({message:{member,text},name}) =>{
   let isSentByCurrentUser=false;
   const trimmedName = name.trim().toLowerCase();

   if(member===trimmedName){
        isSentByCurrentUser=true;
   }

   return (
        isSentByCurrentUser
        ?(
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        :(
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
                <p className="sentText pl-10">{member}</p>
            </div>
        )
   )
}

export default Message;