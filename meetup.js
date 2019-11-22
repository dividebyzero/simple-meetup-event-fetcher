const fetch = require('node-fetch');

console.log("-------------USAGE: node meetup.js groupname eventid");

var myArgs = process.argv.slice(2);

let groupname =myArgs[0];
let event =myArgs[1];



fetchEvent(groupname, event);
fetchAttendance(groupname, event);



function fetchEvent(groupname, event){

fetch("https://api.meetup.com/"+groupname+"/events/"+event+"")
    .then(res => res.json())
    .then(data => {
            //console.log("HAS DATA #"+JSON.stringify(data));
            console.log("EVENT "+data.name +" Date: "+data.local_date);
            

}
);



}


function fetchAttendance(groupname, event){

fetch("https://api.meetup.com/"+groupname+"/events/"+event+"/attendance?&sign=true&photo-host=public&page=100")
    .then(res => res.json())
    .then(data => {
           // console.log("HAS DATA #"+data.length);
            const len = data.length;
            for(let i=0; i< len; i++){
                const p = data[i];
               // console.log(p.member.name);
                getMember(p.member.id);

            }

}
);




}


function getMember(memberId){
//console.log("memID>>"+memberId+"<<)");
fetch('https://api.meetup.com/members/'+memberId)
    .then(res => res.json())
    .then(data => {
            //console.log("HAS DATA #"+JSON.stringify(data));
            console.log(data.name);

}
);



}
