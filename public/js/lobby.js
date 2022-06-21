const lobbySection=document.querySelector('.lobby-section')


export default function lobby(){
    fetch('https://lokkeroom.herokuapp.com/api/lobby/3?page=1&limit=100',{
       method:"GET"
      
    })
    .then(res=>res.json())
    .then(data=>{
       for(let i=0;i<data.length;i++){
        let sec =document.createElement('p')
        sec.innerText=data.messages[message]
        lobbySection.appendChild(sec)
       }
    })
   }