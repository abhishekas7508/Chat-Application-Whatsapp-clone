const express = require('express');
const socketio =require('socket.io');
const http=require('http');
const router =require('./router')
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const app=express();
const server=http.createServer(app);
const io=socketio(server);
const { addAMember, removeAMember, getAMember, getAllMembersInRoom} = require('./members.js')

app.use(cors());
app.use(router);

io.on('connection', (socket)=>{
    console.log("A new connection has been made");

    socket.on('join',({name,room},callback)=>{
        const {error,member} =addAMember({id:socket.id, name, room});

        if(error) return callback(error);

        socket.join(member.room);

        //system generated message, when a member joins a room (welcome message)
        socket.emit('message', {member:'admin',text:`${member.name} welcome to the room ${member.room}`});
        //system generated message, notifying all the other members in the room about the new member
        socket.broadcast.to(member.room).emit('message',{member:'admin',text:`${member.name} has joined the chat`});

        console.log('a member joined:'+member.name+' '+member.room);
        

        callback();

    })

    socket.on('sendMessage',(message)=>{
        const member = getAMember(socket.id);
        console.log('socket.id='+socket.id);
        console.log('member=',member);
        //console.log('sendMessage event made from the client '+member.name+' '+member.room);
        io.to(member.room).emit('message',{member:member.name,text:message});

        //callback();
    })

    socket.on('disconnect',()=>{
        const member=removeAMember(socket.id);
        if(member) {
            io.to(member.room).emit('message', { member: 'Admin', text: `${member.name} has left.` });
        }
        console.log(`${member.name} has left!!!`);
    })
});

server.listen(PORT, () => console.log(`Server has started.`));

