const members = []

const addAMember = ({id,name,room})=>{
    //removing spaces, abc xyz -> abcxyz
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();

    const userExistsAlready = members.find( (member)=> member.name===name && member.room===room)

    if(userExistsAlready){
        return {error:"Username is Already taken!"}
    }

    const member={id,name,room}
    members.push(member);
    return {member};
}

const removeAMember = (id)=>{
    const index=members.findIndex( (member)=> member.id === id )

    if(index!==-1){
        return members.splice(index,1)[0];
    }
}

const getAMember = (id)=> members.find((member)=> member.id===id);

const getAllMembersInRoom = (room) => members.filter((member) => member.room===room);

module.exports = { addAMember, removeAMember, getAMember, getAllMembersInRoom} ;