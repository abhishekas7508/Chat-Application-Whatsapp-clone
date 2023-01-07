import React, {useState,useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';


let socket;

const Chat = (location)=>{
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);
    const ENDPOINT='localhost:4000'

    useEffect(()=>{
        //have to use window.location.search instead of location.search
        const {name,room} = queryString.parse(window.location.search)

        //instead of io(ENDPOINT) use this
        socket=io(ENDPOINT, { transports : ['websocket'] });
        setName(name);
        setRoom(room);

        socket.emit('join',{name,room},({error})=>{

        })

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT])

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
    },[messages]);

    //TODO: function for sending messages
    const sendMessage=(event)=>{
        event.preventDefault();

        if(message){
            socket.emit('sendMessage',message);
            setMessage('');
        }
    }

    console.log(messages);

    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/> 
                {/* <p>{message}</p>
                <input value={message} onChange={(event)=> setMessage(event.target.value) }  onKeyDown={event=>event.key==='Enter'?sendMessage(event):null} placeholder="Type your message here..."/> */}


            </div>
        </div>
    )
}

export default Chat;